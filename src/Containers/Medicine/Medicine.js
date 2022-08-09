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
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector , useDispatch } from 'react-redux';
import { MedicineAction } from '../../Redux/Actions/Medicine.Action';


function Medicine(props) {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState([]);
    const [Dopen, setDOpen] = React.useState(false);
    const [did, setDid] = useState([0]);
    const [update, setUpdate] = useState(false);
    const [filterData , setFilterData] = useState([]);

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
        let LocalData = JSON.parse(localStorage.getItem("Medicines"));

        let udata = LocalData.map((l) => {
            if (l.id === values.id) {
                return values
            } else {
                return l
            }
        })



        localStorage.setItem("Medicines", JSON.stringify(udata))
        console.log(values);
        handleClose();
        LoadData();
        formikObj.resetForm()
        setUpdate(false)

    }

    let schema = yup.object().shape({
        name: yup.string().required("Please Enter Name"),
        Price: yup.number().required("Please Enter Price"),
        expiry: yup.string().required("Please Enter Expiry"),
        Quntity: yup.string().required("Please Enter Quntity"),

    });

    const handleInsert = (values) => {
        let localData = JSON.parse(localStorage.getItem("Medicines"))

        let id = Math.floor(Math.random() * 1000);
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
            if (update) {
                handleUpdate(values)
            } else {
                handleInsert(values)

            }
        },

    });
    const handleDelete = (params) => {
        let LocalData = JSON.parse(localStorage.getItem("Medicines"));
        let fData = LocalData.filter((l) => l.id !== did)
        localStorage.setItem("Medicines", JSON.stringify(fData))
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
        { field: 'name', headerName: 'Name', width: 70 },
        { field: 'Price', headerName: 'Price', width: 70 },
        { field: 'Quntity', headerName: 'Quntity', width: 70 },
        { field: 'expiry', headerName: 'Expiry', width: 70 },
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
        dispatch(MedicineAction());
    }
    
    const dispatch = useDispatch();
    const me = useSelector( state => state.Medicine);

    console.log(me.medicine);

    useEffect(() => {
        LoadData();
    }, [])

    const handleSearch = (val) => {
        let LocalData = JSON.parse(localStorage.getItem("Medicines"))

        //console.log(val, LocalData);

        let SData = LocalData.filter((s)=>(
            s.name.toLowerCase().includes(val.toLowerCase()) ||
            s.expiry.toString().includes(val)||
            s.Price.toString().includes(val)||
            s.Quntity.toString().includes(val)

        ));
        setFilterData(SData)
        
      
        
    }
    const fData = filterData. length > 0 ? filterData :data;
    return (
        <div>
            <h1>Medicine</h1>
            <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Medicine
                </Button>
                <TextField
                   margin="dense"
                    name="search"
                    label="Medicine Search"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={me.medicine}
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

                <Dialog open={  open} onClose={handleClose} fullWidth>
                    <DialogTitle>Add Medicine</DialogTitle>
                    <Formik values={formikObj}>
                        <Form onSubmit={handleSubmit}>
                            <DialogContent>

                                <TextField
                                    value={values.name}
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
                                    value={values.Price}
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
                                    value={values.expiry}
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
                                    value={values.Quntity}
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
        </div>
    );
}

export default Medicine;
