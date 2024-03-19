import React, { Children, useState,useCallback } from 'react';
import './Layout.scss';
import IconXiaLa from '../assets/xiala.svg?react'
import Submit from '../assets/submit2.svg?react'

const initialItems=[
    {id:1, description: "Conference", urgency:1, complete:false},
    {id:2, description: "Meeting", urgency:1, complete:false},
    {id:3, description: "Booking", urgency:3, complete:false}
]
function Logo(){
    return (<div className="logo">
            <h1>🎸Far Away</h1>
            <h2>On Your AVENUE 🌈</h2>
        </div>
        )
}

function MyButton(props){
    const{onClick,type,icon,size} =props

    return (
        
        <button type='button' className={`button ${type} ${size}`} onClick={onClick}>
            <span>{props.children}</span>
            <span className={`button-icon icon`}>{icon}</span>
            
        </button>
    )

}

function MyDropdown(props){
    const {onChange,name} = props
    const [dropdownCheck,setDropdownCheck] = useState(false)
    const [chosen,setChosen] = useState('Type Choice')
    const  dropdownFlip =  () =>{
        setDropdownCheck(dropdownCheck=>!dropdownCheck)
    }
    const onClick =useCallback((e)=>{
        const content = e.target.innerHTML
        setChosen(content)
        onChange(name,content)
    },[])

    return (
        <div className="dropdown-container">
                <MyButton name="dropdown" type="prominent" size="extra-large" onClick={dropdownFlip} icon={<IconXiaLa/>}>{chosen}</MyButton>
                <div className={`dropdown-list-container ${dropdownCheck? 'unfolded' : 'folded' }`} >
                    <div className="dropdown-list-wrapper">
                        <ul className="dropdown-list">
                            {Array.from({length:20},(_,i)=>i+1).map(
                                (num)=>(
                                    <li className='dropdown-list-item' key={num} onClick={onClick}>{num}</li>
                                )
                            )}
                            

                        </ul>
                        <div className="floating-icon"></div>
                    </div>
                </div>
            </div>
        
    )

}

function Form(props){
    const{onSubmit} =props
    const [data,setData] = useState({})

    const formDataHandler = (type,content)=>{
        setData({
            ...data,
            [type]:content
        })
    }
    const formSubmitHandler =()=>{
        onSubmit(data)
    }
    

    return (

        <form className='form'>                  
            <h3>Gonna create a task📑 on your agenda?</h3>
            <MyDropdown name="agenda-item-type" onChange={formDataHandler}/>
            <MyButton name="submit" type="primary" size="small" onClick={formSubmitHandler} icon={<Submit />}>ADD NEW</MyButton>

        </form>
    )
}

function Agenda(props){
    const {agendaList} = props
    return (
    <div className="agenda">
        
        <ul className='agenda-container'>
        { agendaList.map((item)=>{
           
           return <Item item={item} key={item.id}/>
        })}
        </ul>

    </div>)
}
React.memo(Agenda,(p1,p2)=>p1.length==p2.length)

function Item({item}){
    const renderItemDetail = (obj)=>{
        const res = []
        for(let key in obj){
            res.push(<span key={key}>
                {key}:{obj[key]}
            </span>)
        }

        return res       
    }
    return (
        <li className='item'>
            <span className='item-content'>{item.id} 
            {renderItemDetail(item.description).map((i)=>{
                return i
            })}
                
            </span>
            
            <button>❌</button>
        </li>
    )

}



function Footer(){
    return(
        <footer>
            <em>{}footer</em>
        </footer>
    )
}


export default function Layout(props){
    const {children} = props
    const [agendaList, setAgendaList] = useState([])
    const formAction= useCallback((newFormData)=>{
        const newAgendaItemOBJ = {
            id:agendaList.length+1,
            description:newFormData,
            urgency:1,
            complete:false
        }
        setAgendaList([...agendaList,newAgendaItemOBJ])

    },[agendaList])
    return(
        <div className='layout'>
            <div className='layout-container'>
                <Logo></Logo>
                <Form onSubmit={formAction}/>
                <Agenda agendaList={agendaList}></Agenda>
                    {children}
                <Footer></Footer>
            </div>

        </div>

    )
}