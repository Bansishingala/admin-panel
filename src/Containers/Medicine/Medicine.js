import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';


function Medicine(props) {
    const [open, setOpen] = React.useState(false);
    const [data , setData] =  useState([])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    let schema = yup.object().shape({
        name: yup.string().required("Please Enter Name"),
        Price: yup.number().required("Please Enter Price"),
        expiry: yup.string().required("Please Enter Expiry"),
        Quntity: yup.string().required("Please Enter Quntity"),

    });

    const handleInsert = (values) => {
        let localData = JSON.parse(localStorage.getItem("Medicines"))

        let id = Math.floor(Math.random()*1000);
        let data = {
            id: id,
            ...values
        }
       
        if (localData === null) {
            localStorage.setItem("Medicines", JSON.stringify([data]))
        } else {
            localData.push(data)
            localStorage.setItem("Medicines", JSON.stringify(localData))

        }

        console.log(values, localData);

        formikObj.resetForm()
        handleClose()
        LoadData();
    }

    const formikObj = useFormik({
        initialValues: {
            name: '',
            Price: '',
            expiry: '',
            Quntity: ''

        },
        validationSchema: schema,
        onSubmit: values => {
            handleInsert(values)
        },

    });

    const { handleBlur, handleChange, handleSubmit, errors, touched } = formikObj

    const columns = [
        { field: 'name', headerName: 'Name', width: 70 },
        { field: 'Price', headerName: 'Price', width: 70 },
        { field: 'Quntity', headerName: 'Quntity', width: 70 },
        { field: 'expiry', headerName: 'Expiry', width: 70 },
       
    ];
    const LoadData = () => {
          let LocalData = JSON.parse(localStorage.getItem("Medicines"))

          setData(LocalData)
    }

     useEffect (() => {
        LoadData();
    } , [])
    return (
        <div>
            <h1>Medicine</h1>
            <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Medicine
                </Button>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </div>

                <Dialog open={open} onClose={handleClose} fullWidth>
                    <DialogTitle>Add Medicine</DialogTitle>
                    <Formik values={formikObj}>
                        <Form onSubmit={handleSubmit}>
                            <DialogContent>

                                <TextField
                                    margin="dense"
                                    name="name"
                                    label="Medicine Name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.name && touched.name ? <p>{errors.name}</p> : ''}
                                <TextField
                                    margin="dense"
                                    name='Price'
                                    label="Price"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.Price && touched.Price ? <p>{errors.Price}</p> : ''}
                                <TextField
                                    margin="dense"
                                    name='expiry'
                                    label="Expiry"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.expiry && touched.expiry ? <p>{errors.expiry}</p> : ''}
                                <TextField
                                    margin="dense"
                                    name='Quntity'
                                    label="Quntity"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.Quntity && touched.Quntity ? <p>{errors.Quntity}</p> : ''}
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type='submit'>Subscribe</Button>
                            </DialogActions>
                        </Form>
                    </Formik>
                </Dialog>
            </div>
        </div>
    );
}

export default Medicine;
