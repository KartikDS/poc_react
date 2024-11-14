'use client';

import { Formik } from 'formik';
import React, { memo } from 'react';
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';
//import { useRouter } from 'next/navigation';

import { useLoading, useRequest } from '@/components/App';
import { KEYPAIR } from '@/types/interfaces';
import { confirmDialog, toastr } from '@/utils/helpers';
import MarkdownEditor from '@/components/Default/MarkdownEditor';
import CustomInput from '@/components/Default/FormControl/CustomInput';
interface CMS {
  id: string;
  title: string;
  slug: string;
  content: string;
  subTitle: string;
  metaTitle: string;
  metaKeyword: string;
  shortDescription: string;
  metaDescription: string;
  createdAt: string;
  updatedAt: string;
  status: boolean;
  action: JSX.Element;
}

const FormikSchema = Yup.object().shape({
  title: Yup.string().trim().min(2, 'Too Short!').max(50, 'Too Long!').required('Title is required.'),
  slug: Yup.string().trim().min(2, 'Too Short!').max(50, 'Too Long!').required('Slug is required.'),
  metaTitle: Yup.string().trim().min(2, 'Too Short!').max(255, 'Too Long!').required('Meta title is required.'),
  subTitle: Yup.string().trim().min(2, 'Too Short!').max(255, 'Too Long!').required('Sub title is required.'),
  metaKeyword: Yup.string().trim().min(2, 'Too Short!').max(255, 'Too Long!').required('Meta keyword is required.'),
  shortDescription: Yup.string()
    .trim()
    .min(2, 'Too Short!')
    .max(255, 'Too Long!')
    .required('Short description is required.'),
  metaDescription: Yup.string()
    .trim()
    .min(2, 'Too Short!')
    .max(255, 'Too Long!')
    .required('Meta description is required.'),
  content: Yup.string().trim().required('Content is required.'),
});

interface PROPS {
  state: {
    pageDetail?: CMS;
    edit?: string;
  };
  dev: string | null;
  dispatch: React.Dispatch<KEYPAIR>;
  handleClose: () => void;
}

function PageForm(props: PROPS) {
  const { request, loading } = useRequest();
  const { ButtonLoader } = useLoading();
  const { state, dispatch } = props;
  //const router = useRouter();

  const handleSubmit = async (values: KEYPAIR) => {
    dispatch({ isEditLoading: true });
    const confirm = await confirmDialog('Are you sure you want to save these changes?', 'Save changes');
    if (confirm) {
      values.status = values?.status === '1' ? true : false;
      const options = { pageid: state?.pageDetail?.id };
      const req = !state.edit ? await request('CREATE_CMS', values) : await request('UPDATE_CMS', values, options);

      if (req) {
        toastr('The page has been successfully saved.', 'success', !state.edit ? 'New Page created' : 'Page updated');
        dispatch({ isEditLoading: false, userSelected: [] });
        return props.handleClose();
      }
    }
  };

  return (
    <div className="canvasData">
      <h3>Page details</h3>
      <Formik
        enableReinitialize={true}
        initialValues={{
          title: (state?.pageDetail?.title || '') as string,
          slug: (state?.pageDetail?.slug || '') as string,
          metaTitle: (state?.pageDetail?.metaTitle || '') as string,
          subTitle: (state?.pageDetail?.subTitle || '') as string,
          metaKeyword: (state?.pageDetail?.metaKeyword || '') as string,
          shortDescription: (state?.pageDetail?.shortDescription || '') as string,
          metaDescription: (state?.pageDetail?.metaDescription || '') as string,
          content: (state?.pageDetail?.content || '') as string,
          status: state?.pageDetail?.status ? '1' : '0',
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={FormikSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange, setFieldValue, values, errors, touched }) => (
          <div className="inner">
            <div className="topSection">
              <form id="user-form" noValidate onSubmit={handleSubmit}>
                <div className="row details border-0 insideSection">
                  <div className="col-md-6 form-group mb-3">
                    <label htmlFor="title" className="form-label">
                      Title <span style={{ color: 'red' }}>*</span>
                    </label>
                    <CustomInput
                      name="title"
                      id="title"
                      placeholder="Title"
                      onChange={handleChange}
                      value={values.title}
                      error={errors.title}
                    />
                  </div>
                  <div className="col-md-6 form-group mb-3">
                    <label htmlFor="slug" className="form-label">
                      Slug <span style={{ color: 'red' }}>*</span>
                    </label>
                    <CustomInput
                      name="slug"
                      id="slug"
                      placeholder="Slug"
                      onChange={handleChange}
                      value={values.slug}
                      error={errors.slug}
                    />
                  </div>
                  <div className="col-md-6 form-group mb-3">
                    <label htmlFor="metaTitle" className="form-label">
                      Meta Title <span style={{ color: 'red' }}>*</span>
                    </label>
                    <CustomInput
                      name="metaTitle"
                      id="metaTitle"
                      placeholder="Meta Title"
                      onChange={handleChange}
                      value={values.metaTitle}
                      error={errors.metaTitle}
                    />
                  </div>
                  <div className="col-md-6 form-group mb-3">
                    <label htmlFor="metaKeyword" className="form-label">
                      Meta Keyword <span style={{ color: 'red' }}>*</span>
                    </label>
                    <CustomInput
                      name="metaKeyword"
                      id="metaKeyword"
                      placeholder="Meta Keyword"
                      onChange={handleChange}
                      value={values.metaKeyword}
                      error={errors.metaKeyword}
                    />
                  </div>
                  <div className="col-md-6 form-group mb-3">
                    <label htmlFor="shortDescription" className="form-label">
                      Short Description <span style={{ color: 'red' }}>*</span>
                    </label>
                    <CustomInput
                      type="textarea"
                      name="shortDescription"
                      id="shortDescription"
                      placeholder="Short Description"
                      onChange={handleChange}
                      className="custom-textarea"
                      value={values.shortDescription}
                      error={errors.shortDescription}
                      // rows={5}
                    />
                  </div>
                  <div className="col-md-6 form-group mb-3">
                    <label htmlFor="metaDescription" className="form-label">
                      Meta Description <span style={{ color: 'red' }}>*</span>
                    </label>
                    <CustomInput
                      name="metaDescription"
                      id="metaDescription"
                      placeholder="Meta Description"
                      type="textarea"
                      className="custom-textarea"
                      onChange={handleChange}
                      value={values.metaDescription}
                      error={errors.metaDescription}
                    />
                  </div>
                  <div className="col-md-6 form-group mb-3">
                    <label htmlFor="subTitle" className="form-label">
                      Subtitle <span style={{ color: 'red' }}>*</span>
                    </label>
                    <CustomInput
                      name="subTitle"
                      id="subTitle"
                      placeholder="Subtitle"
                      onChange={handleChange}
                      value={values.subTitle}
                      error={errors.subTitle}
                    />
                  </div>
                  <div className="col-md-12 form-group mb-3">
                    <label htmlFor="content" className="form-label">
                      Content <span style={{ color: 'red' }}>*</span>
                    </label>
                    <MarkdownEditor
                      // config={}
                      content={values.content}
                      onChange={(newContent: string) => setFieldValue('content', newContent)}
                    />
                    {errors.content && touched.content ? <div className="text-danger">{errors.content}</div> : null}
                  </div>

                  <div className="col-md-12 form-group mb-3">
                    <label htmlFor="status" className="form-label">
                      Status <span style={{ color: 'red' }}>*</span>
                    </label>
                    <div>
                      <Form.Check
                        type="checkbox"
                        id="status-checkbox"
                        label="Active"
                        name="status"
                        defaultChecked={values.status === '1'}
                        onChange={e => {
                          handleChange({ target: { name: 'status', value: e.target.checked ? '1' : '0' } });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="plr24 canvasFooter">
              <button className="btn OutlineBtnDanger fs12" onClick={props.handleClose}>
                Cancel
              </button>
              <button type="submit" form="user-form" className="btn customBtn fs12">
                {loading?.updateUser_LOADING ? ButtonLoader() : 'Save'}
              </button>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default memo(PageForm);
