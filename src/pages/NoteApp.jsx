import React, { useState } from "react";
import Box from '@mui/joy/Box';
import Textarea from '@mui/joy/Textarea';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import TextareaAutosize from 'react-textarea-autosize';
import CssBaseline from '@mui/material/CssBaseline';

import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

// import darkmode from "../components/darkmode.css"; 

// icons
import FormatBoldRoundedIcon from '@mui/icons-material/FormatBoldRounded';
import FormatItalicRoundedIcon from '@mui/icons-material/FormatItalicRounded';
import StrikethroughSRoundedIcon from '@mui/icons-material/StrikethroughSRounded';
import AddIcon from '@mui/icons-material/Add';
import NotesIcon from '@mui/icons-material/Notes';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { dark } from "@mui/material/styles/createPalette";
import { off } from "process";
import { on } from "events";
import zIndex from "@mui/material/styles/zIndex";

function NoteApp(props) { 

    const [title, setTitle] = useState(""); 
    const [content, setContent] = useState(""); 

    function handleTitleChange(event) { 
        setTitle(event.target.value)
    }

    function handleContentChange(event) { 
        setContent(event.target.value)
    }

    function saveNoteClick(event) {
        props.onAdd({ title, content });
        setTitle("");
        setContent("");

        setIsBold(false); // Reset formatting state
        setIsItalic(false);
        setIsStrikeThrough(false);
        
        event.preventDefault();
    }

    // mui mediaQuery for some components
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));
    // 

    // code for the bold icon to work
       const[isBold, setIsBold] = useState(false)
       function toggleBoldClick() { 
        setIsBold(!isBold)
       }
    // 

    // code for the italic icon
    const [isItalic, setIsItalic] = useState(false)
    function toggleItalicClick() { 
        setIsItalic(!isItalic)
    }
    // 

    // code for the strikethrough icon
    const [isStrikeThrough, setIsStrikeThrough] = useState(false)
    function toggleStrikeThroughClick() { 
        setIsStrikeThrough(!isStrikeThrough)
    }
    // 

    // Add link section
    const [showPopup, setShowPopup] = useState(false);
    const [showLinkButton, setShowLinkButton] = useState(false)

    const togglePopup = () => {
        setShowPopup(!showPopup); // Toggle the showPopup state
        setShowLinkButton(!showLinkButton); 
      };


    const[popupTarget, setPopupTarget] = useState("")

    //   once link is being pasted or written
    function handlePopupTargetChange(event) { 
        setPopupTarget(event.target.value)
    }
    // 
    // function for when the "Add Link" button gets clicked" 
       function AddLinkClick(props) {

        return(
        //    <a>{props.sendLink}</a>
        <a style={{textDecoration: "none"}} href={props.sendLink}>{props.sendLink}</a>
        ); 
    }

    const handleLinkClick = () => {
        alert("Link is now saved below content");
    };
   


    const popupStyle = {
        display: showPopup ? "block" : "none",
        position: "absolute",
        top: "50px", 
        width: "350px",
        // height: "40px",
        paddingLeft: "10px", 
        paddingRight: "10px",
        // paddingTop: "10px",
        fontSize: "20px",
        resize: "none",
        backgroundColor: "white",
        boxShadow: "0px 10px 15px #5555",
        outline: "none",
        border: "solid grey",
        borderRadius: "10px", 
        zIndex: 1000, //this allows the code to be above the elements, thus giving it the ability to show over items without messing them up with the use of position absolute as well. 
    };
    // 
    // Add Link Button 
    const linkButtonStyle = { 
        display: showPopup ? "block" : "none",
        position: "absolute", 
        left: "360px",
        top: "50px",
        width: "80px",
        borderRadius: "10px",
        zIndex: "1000", 
        height: "30px",
        backgroundColor: "white",
        boxShadow: "0px 10px 15px #5555",
        outline: "none",
        border: "solid grey",
        cursor: "pointer", 
    }
    // 

    return( 
        <div>
           <darkmode />
            <div className="main-container-noteapp-section-sticky">
                <button onClick={saveNoteClick}>Save</button>
                <div className="icons-sticky">
                    <Link to="/">
                    <p title="Create A New Note" className="create-new-note-icon"> <AddIcon
                         sx={{
                            fontSize: '30px'
                            }} />      
                    </p>
                    </Link>

                    <Link to="/savednotes">
                    <p title="View Your Saved Notes" className="saved-notes-icon"> <NotesIcon
                        sx={{
                                fontSize: '30px'
                                }} />
                    </p>
                    </Link>
                </div>
            </div>

            <div className="main-container-noteapp-section-flow">
                <input className="inputField" onChange={handleTitleChange} value={title} placeholder="Title" type="text"></input>
                <div className="Icons-noteapp">
                    <p onClick={toggleBoldClick} title="Bold" className="icons-one"> <FormatBoldRoundedIcon/>  </p>
                    <p onClick={toggleItalicClick} title="Italic" className="icons-two"> <FormatItalicRoundedIcon/> </p>
                    <p onClick={toggleStrikeThroughClick} title="Strikethrough" className="icons-three"> <StrikethroughSRoundedIcon/> </p>

                    <p onClick={togglePopup} title="Link" className="icons-four"> <AttachFileIcon/> </p>
                    <TextareaAutosize placeholder="Paste Your URL Here"  
                                      value={popupTarget}
                                      onChange={handlePopupTargetChange}
                                      className="popupStyleBox"
                                      style={popupStyle}>

                    </TextareaAutosize>
                    <button className="linkPopupButton" onClick={handleLinkClick} style={linkButtonStyle} >Add Link</button>
                    {/* <div style={theInput ? linkInputStyle() : {}} className="theLinkInput"></div> */}

                    <p title="Disabled" className="icons-six"> <FormatListBulletedIcon/> </p>
                    <p title="Disabled" className="icons-seven"> <FormatListNumberedIcon/> </p> 
                </div>
                {/* <Textarea onChange={handleContentChange} value={content} name="Plain"
                    placeholder="Write your notes here...."
                    // variant="plain"
                    // color="white"
                    sx={{ width: isLargeScreen ? '830px' : '100%', // Adjust width based on screen size
                        borderColor: 'white', 
                        position: 'relative',
                        // left: '291px',
                        left: isLargeScreen ? '291px' : '77%',
                        // top: '28px' }}   
                        top: isLargeScreen ? '28px' : '30px' }}  
                  /> */}
                  <div className="textBox">
                  <TextareaAutosize className="textBox" placeholder="type your content here...."
                                    onChange={handleContentChange} value={content} 
                                    style={{ fontWeight: isBold ? 'bold' : 'normal', 
                                             fontStyle: isItalic ? 'italic' : 'normal',
                                             textDecoration: isStrikeThrough ? 'line-through' : 'none',
                                            
                                    }}
                  />
                            <div className="noteLinkProp">
                            <AddLinkClick sendLink={popupTarget} />
                            </div>
                  </div>
            </div> 
        </div>
    )
}
export default NoteApp