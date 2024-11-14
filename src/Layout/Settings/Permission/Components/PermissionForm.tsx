'use client';

import { Formik } from 'formik';
import React, { memo } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';
// import { useRouter } from 'next/navigation';

import { useLoading, useRequest } from '@/components/App';
import { KEYPAIR } from '@/types/interfaces';
import { confirmDialog, toastr } from '@/utils/helpers';

interface PERMISSION {
  id: string;
  name: string;
  read: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
  action: JSX.Element;
}

const FormikSchema = Yup.object().shape({
  read: Yup.boolean().required('Read permission is required.'),
  create: Yup.boolean().required('Create permission is required.'),
  edit: Yup.boolean().required('Edit permission is required.'),
  delete: Yup.boolean().required('Delete permission is required.'),
  // Other fields can be added as needed
});

interface PROPS {
  state: {
    permissionDetail?: PERMISSION;
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

  const handleSubmit = async (values: KEYPAIR) => {
    dispatch({ isEditLoading: true });
    const confirm = await confirmDialog('Are you sure you want to save these changes?', 'Save changes');
    if (confirm) {
      const options = { permissionid: state?.permissionDetail?.id };
      const req = !state.edit
        ? await request('CREATE_PERMISSION', values)
        : await request('UPDATE_PERMISSION', values, options);

      if (req) {
        toastr(
          'The permissions have been successfully saved.',
          'success',
          !state.edit ? 'New Permission created' : 'Permission updated',
        );
        dispatch({ isEditLoading: false, userSelected: [] });
        return props.handleClose();
      }
    }
  };

  return (
    <div className="canvasData">
      <h3>Permission Details</h3>
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: state?.permissionDetail?.name || '',
          read: state?.permissionDetail?.read || false,
          create: state?.permissionDetail?.create || false,
          edit: state?.permissionDetail?.edit || false,
          delete: state?.permissionDetail?.delete || false,
          role: state?.permissionDetail?.role || '',
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={FormikSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, setFieldValue, values, errors, touched }) => (
          <div className="inner">
            <Form id="user-form" noValidate onSubmit={handleSubmit}>
              <div className="row details border-0 insideSection">
                {/* Name Field */}
                <div className="col-md-12">
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Name <span style={{ color: 'red' }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter name"
                      value={values.name}
                      disabled // Disable the name input
                    />
                  </Form.Group>
                </div>

                {/* Role Field */}
                <div className="col-md-12">
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Role <span style={{ color: 'red' }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="role"
                      placeholder="Role"
                      value={values.role}
                      disabled // Disable the role input
                    />
                  </Form.Group>
                </div>

                {/* Permission Checkboxes */}
                <div className="col-md-12">
                  <Form.Group className="mb-3">
                    <Form.Label>Permissions</Form.Label>
                    <div>
                      <Form.Check
                        type="checkbox"
                        id="read-checkbox"
                        label="Read"
                        name="read"
                        checked={values.read}
                        onChange={e => setFieldValue('read', e.target.checked)}
                      />
                      {errors.read && touched.read && <div className="text-danger">{errors.read}</div>}
                      <Form.Check
                        type="checkbox"
                        id="create-checkbox"
                        label="Create"
                        name="create"
                        checked={values.create}
                        onChange={e => setFieldValue('create', e.target.checked)}
                      />
                      {errors.create && touched.create && <div className="text-danger">{errors.create}</div>}
                      <Form.Check
                        type="checkbox"
                        id="edit-checkbox"
                        label="Edit"
                        name="edit"
                        checked={values.edit}
                        onChange={e => setFieldValue('edit', e.target.checked)}
                      />
                      {errors.edit && touched.edit && <div className="text-danger">{errors.edit}</div>}
                      <Form.Check
                        type="checkbox"
                        id="delete-checkbox"
                        label="Delete"
                        name="delete"
                        checked={values.delete}
                        onChange={e => setFieldValue('delete', e.target.checked)}
                      />
                      {errors.delete && touched.delete && <div className="text-danger">{errors.delete}</div>}
                    </div>
                  </Form.Group>
                </div>
              </div>
            </Form>
            <div className="plr24 canvasFooter">
              <Button className="OutlineBtnDanger fs12" onClick={props.handleClose}>
                Cancel
              </Button>
              <Button type="submit" form="user-form" className="customBtn fs12">
                {loading?.updateUser_LOADING ? ButtonLoader() : 'Save'}
              </Button>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default memo(PageForm);
