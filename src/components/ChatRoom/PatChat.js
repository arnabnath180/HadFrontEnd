import React, { useEffect, useRef, useState } from 'react'
import camera from './camera.png'
import mic from './mic.png'
import phone from './phone.png'
import './Index.css' 
import { createChannel, createClient } from 'agora-rtm-react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Widget, addResponseMessage, deleteMessages, dropMessages  } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux'
import { setInRoom } from '../Redux/PatientSlice'
import DoctorServices from '../../services/DoctorServices'


export default function Index() {
    
    const [localStreamState,setLocalStream]=useState(null);
    const [remoteStreamState,setRemoteStream]=useState(null);
    
    const location=useLocation();

    let uid;
    const patientId = useSelector(state => state.patient.patientId);
    const doctorEmail = location.state;
    
    uid=String(patientId);
    
    const roomId=doctorEmail+"_123";
    let localStream;
    let remoteStream;
    let sendChannel=null;
    let receiveChannel=null;
    const camera_btn = useRef(null);
    const mic_btn = useRef(null);
    const leave_btn = useRef(null);
    const [userJoined,setUserJoined]=useState(false);
    let peerConnection=null;
    let APP_ID="7ce97bbc3ec1405ca54c724c87817be4";
    let token=null;
    let client;
    let channel;
    const [sendChannelState,setSendChannelState]=useState(null);
    const useClient = createClient(APP_ID);
    const useChannel = createChannel(roomId);
    const navigate=useNavigate();
    var configuration = {
        "iceServers" : [ {
            "urls" : ['stun:stun1.1.google.com:19302','stun:stun1.1.google.com:19302']
        } ]
    };
    client = useClient();
    channel = useChannel(client);
    let init=async()=>{
        await client.login({ uid,token })
        await channel.join()   
        channel.on('MemberJoined',handleUserJoined);
        channel.on('MemberLeft',handleUserLeft);
        client.on('MessageFromPeer',handleMessageFromPeer);
        try{
        localStream=await navigator.mediaDevices.getUserMedia({video:true,audio:true});
        }
        catch(err){
            console.log('Error : '+err);
        }
        setLocalStream(localStream);
    }
    let handleUserJoined=async(MemberId)=>{
        console.log('A new user joined:'+MemberId);
        createOffer(MemberId);
    }

    let handleUserLeft=async (MemberId)=>{
        setUserJoined(false);
        sendChannel.close()
        setSendChannelState(null);
        await leaveBtn();
    }

    let handleMessageFromPeer=async(message,MemberId)=>{
        message=JSON.parse(message.text);
        if(message.type==='offer'){
            createAnswer(MemberId,message.offer);
        }
        if(message.type==='answer'){
            addAnswer(message.answer);
        }
        if(message.type==='candidate'){
            if(peerConnection){
                peerConnection.addIceCandidate(message.candidate);
            }
        }
    }

    let createPeerConnection=async(MemberId)=>{
        peerConnection=new RTCPeerConnection(configuration);
        sendChannel = peerConnection.createDataChannel("sendChannel");
        sendChannel.onopen = handleSendChannelStatusChange;
        sendChannel.onclose = handleSendChannelStatusChange;
        peerConnection.ondatachannel = receiveChannelCallback;
        remoteStream=new MediaStream();
        setRemoteStream(remoteStream);
        setUserJoined(true);
        localStream.getTracks().forEach((track)=>{
            peerConnection.addTrack(track,localStream)
        });
        peerConnection.ontrack=(event)=>{
            event.streams[0].getTracks().forEach((track)=>{
                remoteStream.addTrack(track);
            })
        }

        peerConnection.onicecandidate=async(event)=>{
            if(event.candidate){
                client.sendMessageToPeer({text:JSON.stringify({'type':'candidate','candidate':event.candidate})},MemberId);
            }
        };

    }
   
    let createOffer=async(MemberId)=>{
        await createPeerConnection(MemberId);
        let offer=await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        client.sendMessageToPeer({text:JSON.stringify({'type':'offer','offer':offer})},MemberId);
    }
    
    let createAnswer=async(MemberId,offer)=>{
        await createPeerConnection(MemberId);
        await peerConnection.setRemoteDescription(offer);
        let answer=await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        client.sendMessageToPeer({text:JSON.stringify({'type':'answer','answer':answer})},MemberId);
    }

    let addAnswer=async(answer)=>{
        if(!peerConnection.currentRemoteDescription){
            peerConnection.setRemoteDescription(answer);
        }
    }

    let receiveChannelCallback=(event)=>{
        receiveChannel = event.channel;
        receiveChannel.onmessage = handleReceiveMessage;
        receiveChannel.onopen = handleReceiveChannelStatusChange;
        receiveChannel.onclose = handleReceiveChannelStatusChange;
    }
    let handleSendChannelStatusChange=(event)=>{
        if (sendChannel) {
            console.log("Send channel's status has changed to: "+sendChannel.readyState);
        }
    }

    let handleReceiveChannelStatusChange=(event)=>{
        if (receiveChannel) {
          console.log("Receive channel's status has changed to: "+receiveChannel.readyState);
        }
        setSendChannelState(sendChannel);
    }
    

    let handleReceiveMessage=(event)=>{
        console.log("Message: "+event.data);
        addResponseMessage(event.data);
    }

    let leaveChannel=async()=>{
        sendChannel.close();
        receiveChannel.close();
        peerConnection.close();
        await channel.leave();
        await client.logout();
    }
    
    const handleNewUserMessage=(event)=>{
        sendChannelState.send(event);
    }

    let toggleCamera=async()=>{
        let videoTrack=localStream.getTracks().find(track=>track.kind==='video')
        if(videoTrack.enabled){
            videoTrack.enabled=false;
            camera_btn.current.style.backgroundColor='rgb(255,80,80)';
        }
        else{
            videoTrack.enabled=true;
            camera_btn.current.style.backgroundColor='rgb(179,102,249,.9)';
        }
    }

    let toggleMic=async()=>{
        let audioTrack=localStream.getTracks().find(track=>track.kind==='audio')
        if(audioTrack.enabled){
            audioTrack.enabled=false;
            mic_btn.current.style.backgroundColor='rgb(255,80,80)';
        }
        else{
            audioTrack.enabled=true;
            mic_btn.current.style.backgroundColor='rgb(179,102,249,.9)';
        }
    }

    const dispatch=useDispatch();

    let leaveBtn=async()=>{
        dropMessages();
        localStream.getTracks().forEach(function(track) {
            track.stop();
        });
        if(sendChannel)
            sendChannel.close();
        if(receiveChannel)
            receiveChannel.close();
        if(peerConnection)    
            peerConnection.close();
        await channel.leave();
        await client.logout();
        dispatch(setInRoom(false));
        navigate('/PatientDashboard');
    }

    window.addEventListener('beforeunload',leaveChannel);
    useEffect(()=>{
        init();
        camera_btn.current.addEventListener('click',toggleCamera);
        mic_btn.current.addEventListener('click',toggleMic);
        leave_btn.current.addEventListener('click',leaveBtn)
    },[]);

      
  return (
    <div className="container-fluid">
            <div className='col col-sm-8'>
                <div className='row'>
                    <div id="videos">
                        {userJoined===false?
                        <video className="video-player" id="user-1" autoPlay ref={(ref)=>
                        {if(ref) ref.srcObject=localStreamState}}></video>
                        :<video className="smallFrame" autoPlay ref={(ref)=>
                            {if(ref) ref.srcObject=localStreamState}}></video>}
                        {userJoined?        
                        <video className="video-player" id="user-2" autoPlay ref={(ref)=>
                        {if(ref) ref.srcObject=remoteStreamState}}></video>
                        :""}
                    </div>
                    
                    <div id="controls">
                        <div className="control-container" id="camera-btn" ref={camera_btn}>
                            <img src={camera}/>
                        </div>
                        <div className="control-container" id="mic-btn" ref={mic_btn}>
                            <img src={mic} />
                        </div>
                        <div className="control-container" id="leave-btn" ref={leave_btn}>
                            <img src={phone} />
                        </div>
                    </div>
                
            </div>
           
           
            <div className='col-sm-4'>
                {!(sendChannelState===null)?
                <Widget
                handleNewUserMessage={handleNewUserMessage}
                dropMessages
                title="Chat box"
                subtitle=""
                /> : ""}
                </div>
            </div>
           
    </div>
    
  )
}