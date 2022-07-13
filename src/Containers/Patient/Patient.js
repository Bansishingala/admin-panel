import React, { useState , useEffect } from 'react';
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
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';



function Patient(props) {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState([]);
    const [Dopen, setDOpen] = React.useState(false);
    const [did, setDid] = useState([0]);
    const [update, setUpdate] = useState(false);
    const [filterData, setFilterData] = useState([]);

    const handleDClickOpen = () => {
        setDOpen(true);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDOpen(false);
        setUpdate(false)
        formikObj.resetForm()
    };
    const handleUpdate = (values) => {
        let LocalData = JSON.parse(localStorage.getItem("Patient"));

        let udata = LocalData.map((l) => {
            if (l.id === values.id) {
                return values
            } else {
                return l
            }
        })



        localStorage.setItem("Patient", JSON.stringify(udata))
        console.log(values);
        handleClose();
        LoadData();
        formikObj.resetForm()
        setUpdate(false)

    }   

    let schema = yup.object().shape({
        name: yup.string().required("Please Enter Name"),
        mobile: yup.number("Please Enter your number").required("Please enter Mobile Number"),
        email: yup.string().email("Please Enter Your Valid Email").required("Please enter your Email"),

    });
    const handleInsert = (values) => {
        let localData = JSON.parse(localStorage.getItem("Patient"))

        let id = Math.floor(Math.random() * 1000);
        let data = {
            id: id,
            ...values
        }

        if (localData === null) {
            localStorage.setItem("Patient", JSON.stringify([data]))
        } else {
            localData.push(data)
            localStorage.setItem("Patient", JSON.stringify(localData))

        }

        console.log(values, localData);

        formikObj.resetForm()
        handleClose()
        LoadData();
    }

    const formikObj = useFormik({
        initialValues: {
            name: '',
            mobile: '',
            email: ''

        },
        validationSchema: schema,
        onSubmit: values => {
            if (update) {
                handleUpdate(values)
            } else {
                handleInsert(values)

            }
        },

    });
    const handleDelete = (params) => {
        let LocalData = JSON.parse(localStorage.getItem("Patient"));
        let fData = LocalData.filter((l) => l.id !== did)
        localStorage.setItem("Patient", JSON.stringify(fData))
        LoadData();
        console.log(params.id, fData);
        handleClose()
    }

    const { handleBlur, handleChange, handleSubmit, errors, touched, values } = formikObj

    const handleEdit = (params) => {

        setUpdate(true);

        handleClickOpen();

        formikObj.setValues(params.row)
    }
    const columns = [
        { field: 'name', headerName: 'Name', width: 100 },
        { field: 'mobile', headerName: 'mobile', width: 170 },
        { field: 'email', headerName: 'email', width: 170 },
       
        {
            field: 'action',
            headerName: 'Action',
            width: 170,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="Edit" onClick={() => { handleEdit(params) }}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => { handleDClickOpen(); setDid(params.id) }}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        },

    ];
    const LoadData = () => {
        let LocalData = JSON.parse(localStorage.getItem("Patient"))
        if (LocalData !== null) {
            setData(LocalData)
        }
        console.log(LocalData);
    }

    useEffect(() => {
        LoadData();
    }, [])

    const handleSearch = (val) => {
        let LocalData = JSON.parse(localStorage.getItem("Patient"))

        //console.log(val, LocalData);

        let SData = LocalData.filter((s) => (
            s.name.toLowerCase().includes(val.toLowerCase()) ||
            s.mobile.toString().includes(val) ||
            s.email.toString().includes(val) 
        ));
        setFilterData(SData)



    }
    const fData = filterData.length > 0 ? filterData : data;
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Patient
            </Button>
            <TextField
                margin="dense"
                name="search"
                label="Patient Search"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => handleSearch(e.target.value)}
            />
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={fData}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
            <Dialog
                open={Dopen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are You Sure Delete?"}
                </DialogTitle>
                <DialogContent>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Add Patient</DialogTitle>
                <Formik values={formikObj}>
                    <Form onSubmit={handleSubmit}>
                        <DialogContent>

                            <TextField
                                value={values.name}
                                margin="dense"
                                name="name"
                                label="Patient Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.name && touched.name ? <p>{errors.name}</p> : ''}
                            <TextField
                                value={values.Price}
                                margin="dense"
                                name='mobile'
                                label="mobile"
                                type="number"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.mobile && touched.mobile ? <p>{errors.mobile}</p> : ''}
                            <TextField
                                value={values.expiry}
                                margin="dense"
                                name='email'
                                label="email"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.email && touched.email ? <p>{errors.email}</p> : ''}
                           
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            {
                                update ?
                                    <Button type='submit'>Update</Button>
                                    :
                                    <Button type='submit'>submit</Button>

                            }
                        </DialogActions>
                    </Form>
                </Formik>
            </Dialog>
        </div>
    );
}

export default Patient;