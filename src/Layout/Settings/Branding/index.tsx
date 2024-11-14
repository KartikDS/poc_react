'use client';
import { Formik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { memo, SetStateAction, useMemo, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { ChromePicker } from 'react-color';
import * as Yup from 'yup';

import { useLoading, useRequest } from '@/components/App';
import { useCommonReducer } from '@/components/App/reducer';
import useOutsideClick from '@/hooks/useOutsideClick';
import { KEYPAIR } from '@/types/interfaces';
import { toastr } from '@/utils/helpers';

interface PROPS {
  branding: {
    columnData: KEYPAIR;
  };
}
const FormikSchema = Yup.object().shape({
  font: Yup.string().trim().min(2, 'Too Short!').max(50, 'Too Long!').required('Font type Required'),
});

function Index(props: PROPS) {
  const [logoError, setLogoError] = useState('');
  const [bannerError, setBannerError] = useState('');

  const colorPickRef = useRef<any>();
  const router = useRouter();
  const formikRef = useRef<any>();
  const { request, loading } = useRequest();
  const { ButtonLoader } = useLoading();
  const [fontFamilyList] = useState([
    'Inter',
    'Roboto',
    'Poppins',
    'auto',
    'cursive',
    'imoji',
    'fangsong',
    'fantasy',
    'inherit',
    'initial',
    'math',
    'monospace',
    'revert',
    'sans-serif',
    'serif',
    'system-ui',
    'ui-monospace',
    'ui-rounded',
    'ui-sans-serif',
    'ui-serif',
  ]);
  const { state, dispatch } = useCommonReducer({
    primaryColor: '#009d33',
    showSelectedColor: false,
    logoImg: '',
    bannerImg: '',
  });

  useOutsideClick(colorPickRef, () => {
    dispatch({ showSelectedColor: false });
  });

  const handleError = (value: string) => {
    const fileName = value || '';
    const fileExtension = fileName.split('.').pop()?.toLowerCase() || '';
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    return !allowedExtensions.includes(fileExtension);
  };

  const handleFileChange = (event: React.ChangeEvent, name: string) => {
    if (name === 'logoImg') {
      setLogoError('');
    } else {
      setBannerError('');
    }

    const { files } = event.target as HTMLInputElement;
    const selectedFile = files?.[0];
    if (selectedFile) {
      dispatch({ [name]: URL.createObjectURL(selectedFile), [name + '_files']: selectedFile });
    }
  };
  function handleImageDrop(event: React.DragEvent<HTMLLabelElement>, name: string) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      dispatch({ [name]: URL.createObjectURL(droppedFile), [name + '_files']: droppedFile });
    }
  }

  function handleDragOver(event: React.DragEvent<HTMLLabelElement>) {
    event.preventDefault();
  }

  const logoURL = useMemo(() => {
    if (state?.logoImg) {
      return state?.logoImg;
    } else if (props?.branding?.columnData?.logo) {
      return `/spimages/${props?.branding?.columnData?.logo}`;
    } else {
      return '/assets/icons/logoMain.png';
    }
  }, [props?.branding?.columnData?.logo, state?.logoImg]);

  const bannerURL = useMemo(() => {
    if (state?.bannerImg) {
      return state?.bannerImg;
    } else if (props?.branding?.columnData?.banner) {
      return `/spimages/${props?.branding?.columnData?.banner}`;
    } else {
      return '/assets/icons/upload-cloud-02.svg';
    }
  }, [props?.branding?.columnData?.banner, state?.bannerImg]);

  const logoImageLoader = () => {
    return logoURL;
  };
  const bannerImageLoader = () => {
    return bannerURL;
  };

  return (
    <div>
      <div>
        <h3 className="settings-heading">Branding</h3>
      </div>
      <div className="WhtBox mt10 p30">
        <div className="settingInner">
          <Formik
            enableReinitialize={true}
            innerRef={formikRef}
            initialValues={{
              font: (props?.branding?.columnData?.font || '') as string,
              primaryColor: (props?.branding?.columnData?.primaryColor || '') as string,
              logo: logoURL as string,
              banner: bannerURL as string,
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={FormikSchema}
            onSubmit={async values => {
              const formData = new FormData();
              formData.append('font', values.font);
              formData.append('moduleName', 'branding');
              formData.append('primaryColor', values.primaryColor);
              let logoErrorMessage = '';
              let bannerErrorMessage = '';
              if (state?.logoImg_files) {
                const logoFileName = state?.logoImg_files?.['name'];
                if (handleError(logoFileName)) {
                  logoErrorMessage = 'Only .jpg, .jpeg, .png, .gif , .svg files are allowed.';
                }
                formData.append('logo', state?.logoImg_files);
              }

              if (state?.bannerImg_files) {
                const bannerFileName = state?.bannerImg_files?.['name'];
                if (handleError(bannerFileName)) {
                  bannerErrorMessage = 'Only .jpg, .jpeg, .png, .gif , .svg files are allowed.';
                }

                formData.append('banner', state?.bannerImg_files);
              }
              if (logoErrorMessage || bannerErrorMessage) {
                setBannerError(bannerErrorMessage);
                setLogoError(logoErrorMessage);
                return;
              }
              const req = await request('updateSettingsBranding', { formData });

              if (req) {
                toastr('The settings have been successfully saved.', 'success', 'Settings');
                window.location.reload();
              }
            }}
          >
            {({ handleSubmit, handleChange, values, errors, setFieldValue }) => {
              return (
                <form noValidate onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor="logo">Logo</label>
                        {/* <Form.Label>Logo</Form.Label> */}
                        <div className="file-upload">
                          <label
                            onDrop={event => handleImageDrop(event, 'logoImg')}
                            onDragOver={handleDragOver}
                            className="file-upload-inner"
                            htmlFor="logo-upload-settings"
                          >
                            <input
                              name="logo"
                              accept=".jpg, .jpeg, .png, .gif"
                              onChange={event => handleFileChange(event, 'logoImg')}
                              type="file"
                              id="logo-upload-settings"
                              hidden
                            />
                            <div className="upload-icon">
                              <Image alt="uploadIcon" height={20} width={20} src="/assets/icons/upload-cloud-02.svg" />
                            </div>
                            <div className="upload-desc">
                              <p>
                                <a>Click to upload</a> or drag and drop SVG, PNG, JPG or GIF (max. 800x400px)
                              </p>
                            </div>
                          </label>

                          <div className="logo-icon">
                            <Image
                              loader={logoImageLoader}
                              alt="logoIcon"
                              height={29}
                              width={29}
                              src={logoURL}
                              key={`${Math.random()}`}
                            />
                          </div>
                        </div>
                        {logoError ? <span className="text-danger">{logoError}</span> : null}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor="bannerImg">Banner</label>
                        {/* <Form.Label>Banner</Form.Label> */}
                        <div>
                          <div className="bannerImg">
                            <Image
                              objectFit="cover"
                              loader={bannerImageLoader}
                              // width={600}
                              // height={208}
                              fill
                              alt="logoIcon"
                              src={bannerURL}
                              key={`${Math.random()}`}
                            />
                          </div>
                          <label
                            onDrop={event => handleImageDrop(event, 'bannerImg')}
                            onDragOver={handleDragOver}
                            className="file-upload-inner"
                            htmlFor="banner-upload-settings"
                          >
                            <input
                              name="banner"
                              accept=".jpg, .jpeg, .png, .gif"
                              onChange={event => handleFileChange(event, 'bannerImg')}
                              type="file"
                              id="banner-upload-settings"
                              hidden
                            />
                            <div className="upload-icon">
                              <Image alt="uploadIcon" height={20} width={20} src="/assets/icons/upload-cloud-02.svg" />
                            </div>
                            <div className="upload-desc">
                              <p>
                                <a>Click to upload</a> or drag and drop SVG, PNG, JPG or GIF (max. 800x400px)
                              </p>
                            </div>
                          </label>
                        </div>
                        {bannerError ? <span className="text-danger">{bannerError}</span> : null}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor="font">
                          Font <span style={{ color: 'red' }}>*</span>
                        </label>
                        {/* <Form.Label>
                          Font <span style={{ color: 'red' }}>*</span>
                        </Form.Label> */}
                        <Form.Select
                          value={values.font}
                          isInvalid={!!errors.font}
                          name="font"
                          onChange={handleChange}
                          aria-label="Default select example"
                        >
                          <option value="">Select font type</option>
                          {fontFamilyList?.map((mp, index) => (
                            <option key={index} className="text-capitalize" value={mp}>
                              {mp}
                            </option>
                          ))}
                        </Form.Select>
                        {errors.font ? (
                          <Form.Control.Feedback type="invalid">{errors.font}</Form.Control.Feedback>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor="font">Brand color</label>
                        {/* <Form.Label>Brand color</Form.Label> */}
                        <div>
                          <div
                            className="selectColor-btn"
                            onClick={() => {
                              dispatch({ showSelectedColor: true });
                            }}
                          >
                            <div
                              style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                backgroundColor: values?.primaryColor,
                                marginRight: '10px',
                              }}
                            />
                            <span>{values?.primaryColor}</span>
                          </div>
                          {state?.showSelectedColor && (
                            <div ref={colorPickRef}>
                              <ChromePicker
                                color={values?.primaryColor}
                                onChange={(color: { hex: SetStateAction<string> }) => {
                                  setFieldValue('primaryColor', color.hex);
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="settingFooter">
                    <button
                      type="reset"
                      className="btn OutlineBtnDanger mr10"
                      onClick={() => {
                        router.refresh();
                      }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn customBtn ">
                      {loading?.updateSettingsBranding_LOADING ? ButtonLoader() : 'Save'}
                    </button>
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}
export default memo(Index);
