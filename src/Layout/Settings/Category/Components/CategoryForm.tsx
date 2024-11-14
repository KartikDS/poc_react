'use client';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, FormikErrors } from 'formik';

import { KEYPAIR } from '@/types/interfaces';
import UploadImage from '@/components/Default/UploadImageOld';
import CustomSelect from '@/components/Default/CustomSelect';

interface PROPS {
  state: any;
  dispatch: React.Dispatch<KEYPAIR>;
  handleClose: () => void;
}
interface KEYVALUE {
  [key: string]: string;
}

const CategoryFormSchema = Yup.object().shape({
  name: Yup.string().trim().required('Category Name is required'),
});

interface INITVAL {
  name: string;
  image: string | File | null;
  parentCategory: string;
  status: boolean;
}

function CategoryForm(props: PROPS) {
  const options: KEYVALUE[] = [
    { key: 'category1', value: 'Category 1' },
    { key: 'category2', value: 'Category 2' },
    { key: 'category3', value: 'Category 3' },
  ];

  const handelSubmit = async (values: INITVAL, errors: FormikErrors<INITVAL>) => {
    console.log('submitted values: ', values);
    console.log('errors: ', errors);
  };
  return (
    <div className="canvasData">
      <h3>Category details</h3>

      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        enableReinitialize
        validationSchema={CategoryFormSchema}
        initialValues={{
          name: props?.state?.categoryDetail?.name || '',
          image: props?.state?.categoryDetail?.image || null,
          parentCategory: props?.state?.categoryDetail?.parentCategory || '',
          status: props?.state?.categoryDetail?.status || true,
        }}
        onSubmit={handelSubmit}
      >
        {({ handleChange, handleSubmit, setFieldValue }) => {
          return (
            <div className="inner">
              <div className="topSection">
                <Form onSubmit={handleSubmit}>
                  <div>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>
                        Name <span style={{ color: 'red' }}>*</span>
                      </Form.Label>
                      <Form.Control type="name" placeholder="Enter name" name="name" onChange={handleChange} />
                    </Form.Group>
                  </div>
                  <div>
                    <Form.Label>Select Parent Category</Form.Label>
                    <CustomSelect options={options} onChange={handleChange} name="parentCategory" />
                  </div>
                  <div className="mt-4 p-4">
                    <UploadImage name="image" onChange={files => setFieldValue('image', files?.[0] ?? null)} />
                  </div>

                  <div>
                    <Form.Check
                      type={'checkbox'}
                      id={`status`}
                      label={`Status`}
                      defaultChecked={true}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="plr24 canvasFooter">
                    <button className="btn OutlineBtnDanger fs12" onClick={props.handleClose}>
                      Cancel
                    </button>
                    <button type="submit" className="btn customBtn fs12">
                      Save
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          );
        }}
      </Formik>

      {/* <Button className="customBtn SmBtn" onClick={() => props.handleClose()}>
        dfkjbg
      </Button> */}
    </div>
  );
}

export default CategoryForm;
