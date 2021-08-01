import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import SearchIcon from '@material-ui/icons/Search';

import InputsFilter from './inputs';

const useStyles = makeStyles({
    tableContainer: {
        height: "100%",
        direction: "rtl",
        borderRadius: 10,
        maxHeight: 716,
        width: '100%',
        margin: 'auto',
        overflow: 'auto',
        position: "relative"
    },

    table: {
        minWidth: 650,
        direction: "ltr",
        borderRadius: 10
    },
    head: {
        fontWeight: "bold",
        cursor: "pointer",
        whiteSpace: "nowrap",
        // textAlign:"center",
        '& svg': {
            verticalAlign: "middle",
            fill: "rgba(1,1,1,0.5)",
            margin: " 0 1px"
        }
    },
    boxEmpty: {
        width: 24,
        height: 24
    },
    emptyFile: {
        textAlign: "left",
        padding: 10,
        direction: "ltr"
    },
    stickyPagination: {
        textAlign: "center",
        fontWeight: "bold",
        margin: "0px auto",
        position: "sticky",
        bottom: 0,
        /* left: 0; */
        backgroundColor: "whitesmoke",
        padding: "5px 0",
        display: "flex",
        justifyContent: "center",
        direction: "ltr",
    },
});





export default function Index() {

    const classes = useStyles();

    const stateSort = {
        DEFAULT: "DEFAULT",
        ASC: "asc",
        DESC: "desc"
    }
    const tableHeadStart = [
        { id: 1, label: "ردیف", title: null, active: false, type: '' },
        { id: 2, label: "شناسه کاربر", title: "member_id", active: false, type: 'text' },
        { id: 3, label: "مقدار", title: "value", active: false, type: 'text' },
        { id: 4, label: "تاریخ ایجاد", title: "create_date", active: false, type: 'text' },
        { id: 5, label: "تاریخ اعمال", title: "closing_date", active: false, type: 'text' },
        { id: 6, label: "وضعیت", title: "status", active: false, type: 'text' },
        { id: 7, label: "نوع", title: "bonus_type", active: false, type: 'text' },
        { id: 8, label: "مبدا", title: "source", active: false, type: 'text' },
        { id: 9, label: "توضیحات مبدا", title: "source_description", active: false, type: 'text' },
    ];

    const [sort, setSort] = useState({});
    const [state, setstate] = useState({})
    const [tableHead, setTableHead] = useState(tableHeadStart);


    useEffect(() => {
        // create dynamic object state 
        if (tableHeadStart.length) {
            let obj = {}
            tableHeadStart.forEach((item) => obj[item.title] = '')
            setstate(obj)
        }
    }, [])

    const handelChangeState = (value , type) => {
        setstate(prev => (
            {
                ...prev,
                [type] : value
            }
        ))
    }
    const handleClickSort = (title, id) => {
        if (!title) {
            alert("امکان فیلتر این ستون وجود ندارد.")
            return
        }

        if (id === sort.id) {
            let findState = findStateSort(title)
            if (findState === stateSort.DEFAULT) {
                setSort({})
                return
            }
            setSort({ [title]: findState, id: id })
        } else {
            let res = tableHead.map(item => item.id === id ? { ...item, active: true } : { ...item, active: false })
            setTableHead(res)
            setSort({ [title]: stateSort.ASC, id: id })
        }
    }
    const findStateSort = (title) => {
        switch (sort[title]) {
            case stateSort.DEFAULT:
                return stateSort.ASC
            case stateSort.ASC:
                return stateSort.DESC
            case stateSort.DESC:
                return stateSort.DEFAULT
            default:
                return stateSort.DEFAULT
        }
    }



    return (
        <TableContainer className={classes.tableContainer} component={Paper}>
            <Table stickyHeader={true} className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {tableHead?.map((item, index) => (
                            <TableCell
                                key={index}
                                className={classes.head}
                                align="center"
                                onClick={() => handleClickSort(item.title, item.id)}
                            >
                                {item.label}
                                {
                                    item.active ? (
                                        sort[item.title] === stateSort.ASC ?
                                            <ArrowUpwardIcon />
                                            : sort[item.title] === stateSort.DESC ?
                                                <ArrowDownwardIcon />
                                                :
                                                <svg className={classes.boxEmpty}></svg>
                                    ) :
                                        <svg className={classes.boxEmpty}></svg>
                                }
                            </TableCell>
                        ))}
                        <TableCell align="center">
                            <SearchIcon className={classes['SearchIcon']} />
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>


                    <TableRow >
                        {
                            tableHead?.map((item, index) =>
                                <TableCell key={index} >
                                    <InputsFilter data={item} state={state} handelChangeState={handelChangeState} />
                                </TableCell>
                            )
                        }
                        <TableCell align="center">{}</TableCell>
                    </TableRow>

                    <TableRow key={'test'}>
                        <TableCell align="center">{'test'}</TableCell>
                        <TableCell align="center">{'test'}</TableCell>
                        <TableCell align="center">{'test'}</TableCell>
                        <TableCell align="center">{'test'}</TableCell>
                        <TableCell align="center">{'test'}</TableCell>
                        <TableCell align="center">{'test'}</TableCell>
                        <TableCell align="center">{'test'}</TableCell>
                        <TableCell align="center">{'test'}</TableCell>
                        <TableCell align="center">{'test'}</TableCell>
                        <TableCell align="center">{}</TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </TableContainer>
    )
}
