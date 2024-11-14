'use client';

import { Formik } from 'formik';
import React, { memo } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';

import { useLoading, useRequest } from '@/components/App';
import { KEYPAIR } from '@/types/interfaces';
import { confirmDialog, toastr } from '@/utils/helpers';
import UploadImage from '@/components/Default/UploadImage';

const FormikSchema = Yup.object().shape({
  name: Yup.string().trim().min(2, 'Too Short!').max(50, 'Too Long!').required('Name is required.'),
  description: Yup.string().trim().min(2, 'Too Short!').max(255, 'Too Long!').required('Description is required.'),
  feildImage: Yup.mixed().required('Image is required.'),
});

interface PROPS {
  state: {
    fieldDetail?: {
      id: string;
      name: string;
      description: string;
      feildImage: string;
    };
    edit?: string;
  };

  dispatch: React.Dispatch<KEYPAIR>;
  handleClose: () => void;
  industryId: string | null;
}
interface Values {
  name: string;
  description: string;
  feildImage: File | string | null;
}
function FieldForm(props: PROPS) {
  const { request, loading } = useRequest();
  const { ButtonLoader } = useLoading();
  const { state, dispatch } = props;
  const defaultImage = state?.fieldDetail?.feildImage
    ? `/images/${state?.fieldDetail?.feildImage}`
    : '/assets/icons/upload-cloud-02.svg';

  const handleSubmit = async (values: Values) => {
    dispatch({ isEditLoading: true });
    const confirm = await confirmDialog('Are you sure you want to save these changes?', 'Save changes');
    const payload = { ...values, industryId: props.industryId };
    if (confirm) {
      const formData = new FormData();
      for (const [key, value] of Object.entries(payload)) {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value as string);
        }
      }

      const options = { id: state?.fieldDetail?.id };
      const req = !state.edit
        ? await request('CREATE_FIELD', formData)
        : await request('UPDATE_FIELD', formData, options);

      if (req) {
        toastr(
          'The field has been successfully saved.',
          'success',
          !state.edit ? 'New Field created' : 'Field updated',
        );
        dispatch({ isEditLoading: false, userSelected: [] });
        return props.handleClose();
      }
    }
  };

  return (
    <div className="canvasData">
      <h3>Field details</h3>
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: (state?.fieldDetail?.name || '') as string,
          description: (state?.fieldDetail?.description || '') as string,
          feildImage: state?.fieldDetail?.feildImage || null,
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={FormikSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange, setFieldValue, values, errors, touched }) => (
          <div className="inner">
            <div className="topSection">
              <Form id="field-form" noValidate onSubmit={handleSubmit}>
                <div className="row details border-0 insideSection">
                  <div className="col-md-12">
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Name <span style={{ color: 'red' }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                        value={values.name}
                        isInvalid={!!errors.name}
                      />
                      {errors.name && touched.name ? (
                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                      ) : null}
                    </Form.Group>
                  </div>
                  <div className="col-md-12">
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Description <span style={{ color: 'red' }}>*</span>
                      </Form.Label>
                      <Form.Control
                        name="description"
                        placeholder="Description"
                        onChange={handleChange}
                        value={values.description}
                        isInvalid={!!errors.description}
                        as="textarea"
                        rows={6}
                      />
                      {errors.description && touched.description ? (
                        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                      ) : null}
                    </Form.Group>
                  </div>
                  <div className="col-md-12">
                    <div className="">
                      <Form.Group className="mb-3">
                        <Form.Label>
                          Icon <span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <UploadImage
                          name="feildImage"
                          defaultImage={defaultImage}
                          onChange={files => {
                            setFieldValue('feildImage', files?.[0] ?? null);
                          }}
                        />
                        {errors.feildImage && touched.feildImage ? (
                          <div className="text-danger">{errors.feildImage}</div>
                        ) : null}
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
            <div className="plr24 canvasFooter">
              <Button className="OutlineBtnDanger fs12" onClick={props.handleClose}>
                Cancel
              </Button>
              <Button type="submit" form="field-form" className="customBtn fs12">
                {loading?.updateUser_LOADING ? ButtonLoader() : 'Save'}
              </Button>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default memo(FieldForm);
