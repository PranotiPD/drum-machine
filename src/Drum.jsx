import React, { useEffect, useState } from 'react';
import './Drum.css';

const firstGroupSounds = [
    {
        "keyCode" : 81,
        "key" : "Q",
        "id" : "Heater-2",
        "url" : "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
    },
    {
        "keyCode" : 87,
        "key" : "W",
        "id" : "Heater-1",
        "url" : "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
    },
    {
        "keyCode" : 69,
        "key" : "E",
        "id" : "Heater-4",
        "url" : "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
    },
    {
        "keyCode" : 65,
        "key" : "A",
        "id" : "Heater-3",
        "url" : "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
    },
    {
        "keyCode" : 83,
        "key" : "S",
        "id" : "Open-HH",
        "url" : "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
    },
    {
        "keyCode" : 68,
        "key" : "D",
        "id" : "Clap",
        "url" : "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
    },
    {
        "keyCode" : 90,
        "key" : "Z",
        "id" : "Kick",
        "url" : "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
    },
    {
        "keyCode" : 88,
        "key" : "X",
        "id" : "Closed-HH",
        "url" : "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
    },
    {
        "keyCode" : 67,
        "key" : "C",
        "id" : "Kick-n'-Hat",
        "url" : "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
    },
    
]

const secondGroupSounds = [
    {
        "keyCode" : 81,
        "key" : "Q",
        "id" : "Heater-1",
        "url" : "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
    },
    {
        "keyCode" : 87,
        "key" : "W",
        "id" : "Heater-2",
        "url" : "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
    },
    {
        "keyCode" : 69,
        "key" : "E",
        "id" : "Heater-3",
        "url" : "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
    },
    {
        "keyCode" : 65,
        "key" : "A",
        "id" : "Heater-4",
        "url" : "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
    },
    {
        "keyCode" : 83,
        "key" : "S",
        "id" : "Clap",
        "url" : "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
    },
    {
        "keyCode" : 68,
        "key" : "D",
        "id" : "Open-HH",
        "url" : "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
    },
    {
        "keyCode" : 90,
        "key" : "Z",
        "id" : "Kick-n'-Hat",
        "url" : "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
    },
    {
        "keyCode" : 88,
        "key" : "X",
        "id" : "Kick",
        "url" : "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
    },
    {
        "keyCode" : 67,
        "key" : "C",
        "id" : "Closed-HH",
        "url" : "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
    },
    
]

const soundName = {
    heaterKit: "Heater Kit",
    smoothPianoKit: "Smooth Piano Kit"
}

const soundGroup = {
    heaterKit: firstGroupSounds,
    smoothPianoKit: secondGroupSounds,
}

const Keys = ({play, sound: {key, url, keyCode, id}}) => {
    const handleKeyDown = (event) => {
        if(event.keyCode === keyCode){
            play(key, id);
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
    },[])

    return (
        <button className='drum-pad' onClick={() => play(key, id)}>
            <audio src={url} id={key} className='clip' />
            {key}</button>
    )
}

const Keyboard = ({play, sounds}) => (
    <div className='keys'>
        {sounds.map((sound,id) => (<Keys play={play} sound={sound}/>))}
    </div>
   
)

const Drumcontrol = ({name, volume, changeSoundsGroup, handleVolumeChange, power,changePower}) => (
    <div className='control'>
        <button className='change-tune' onClick={changePower}>Power:{power === 1 ? 'on' : 'off'}</button><br></br>
        <h2>volume: {Math.trunc(volume*100)}</h2>
        <input max="1" min="0" step="0.01" type="range" value={volume} onChange={handleVolumeChange} /><br></br>
        <h2 id="display">{name}</h2>
        <button className='change-tune' onClick={changeSoundsGroup}>Bank</button>
    </div>
)

function Drum() {
    const [power, setPower] = useState(1);
    const [volume, setVolume] = useState(1);
    const [soundname, setSoundName] = useState("");
    const [soundType, setSoundType] = useState(soundName.heaterKit);
    const [sounds, setSounds] = useState(soundGroup.heaterKit);

    const play = (key, id) => {
        if(power === 0) return;
        setSoundName(id)
        const audio = document.getElementById(key);
        audio.currentTime = 0;
        audio.play()
    }

    const changeSoundsGroup = () => {
        if(power === 0) return;
        setSoundName('');
        if(soundType === soundName.heaterKit){
            setSoundType(soundName.smoothPianoKit);
            setSounds(soundGroup.smoothPianoKit);
        } else {
            setSoundType(soundName.heaterKit);
            setSounds(soundGroup.heaterKit);
        }
    }

    const setVolumeChange = () => {
        if(power === 0) return;
        const audios = sounds.map((sound) => document.getElementById(sound.key));
        audios.forEach(audio => {
            if(audio){
                audio.volume = volume;
            }
        })
    }

    const handleVolumeChange = (event) => {
        if(power === 0) return;
        setVolume(event.target.value)
    }

    const changePower = () => {
        if(power === 1){
            setPower(0);
        } else {
            setPower(1);
        }
        
    }

    return (
        <div className='container'>
            {setVolumeChange()}
            <div className='drum-machine'>
                <Keyboard play={play} sounds={sounds}/>
                <div className='control-wrapper'>
                    <Drumcontrol name={soundname || setSoundName(soundType)} 
                    changeSoundsGroup={changeSoundsGroup}
                    handleVolumeChange={handleVolumeChange}
                    volume={volume}
                    power={power}
                    changePower={changePower}/>
                    
                </div>
            </div>
        </div>
    );
}

export default Drum;