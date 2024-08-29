import React, { useState, useRef, useEffect } from "react";
import { Button } from "@mantine/core";
import ReactPlayer from "react-player";
import Box from "@mui/material/Box";

// MUI Components
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CircularProgress from "@mui/material/CircularProgress";

const MultiAudioPlayer = ({
  videoUrl,
  audioUrls,
  flagList,
  buttonsName,
  height,
  thumbnail,
}) => {
  const [play, setPlay] = useState(false);
  const [currentLang, setCurrentLang] = useState(Object.keys(audioUrls)[0]);
  const [audioList, setAudioList] = useState(0);
  const audioRef = useRef([]);
  const videoRef = useRef([]);
  const [buffering, setBuffering] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [displayThumbnail, setDisplayThumbnail] = useState(true);
  const thumbImageRef = useRef(null);

  const [playback, setPlayback] = useState([0, 0]);
  return (
    <div className="w-full md:w-11/12 max-w-[889px] mx-auto">
      <div className="w-full relative rounded-xl overflow-auto text-white">
        {/* Invisible thumbnail to prevent resize during play/pause */}
        {/* Thumbnail Support Yet to be implemented */}
        {thumbnail && displayThumbnail ? (
          <Box
            sx={{
              // position: "absolute",
              // zIndex: 10,
              // top: 0,
              // left: 0,
              height: height ? height : "auto",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              sx={{
                position: "absolute",
                zIndex: 10,
                color: "white",
                display: "flex",
                gap: 1,
                alignItems: "center",
                p: "4px",
                backgroundColor: "rgba(168, 168, 168, 0.6)",
                "&:hover": {
                  backgroundColor: "rgba(168, 168, 168, 0.8)",
                },
              }}
              onClick={() => {
                setPlay(true);
                setDisplayThumbnail(false);
                setShowLoader(true);
              }}
            >
              <PlayArrowIcon sx={{ fontSize: "44px" }} />
            </IconButton>

            <img
              className="top-0 left-0 z-0 object-contain h-full w-full opacity-80"
              src={thumbnail}
              alt="Images"
            />
          </Box>
        ) : (
          <>
            {/* Video Player */}
            <ReactPlayer
              playing={play}
              onEnded={() => {
                setPlay(false);
                setDisplayThumbnail(true);
              }}
              url={videoUrl}
              ref={videoRef}
              className="rounded-xl bg-black overflow-hidden aspect-video"
              height={height ? height : "auto"}
              width={"100%"}
              onReady={() => {
                setShowLoader(false);
                setBuffering(false);
              }}
              // onBuffer={() => setBuffering(true)}
              // onBufferEnd={() => setBuffering(false)}
              // onDuration={(duration) => console.log("duration: ", duration)}
              // onSeek={(progress) => {
              //   for (let i in audioList) {
              //     audioRef.current[i].seekTo(progress);
              //   }
              // }}
              onDuration={(dur) =>
                setPlayback((prevState) => [prevState[0], dur])
              }
              progressInterval={100}
              onProgress={(res) => {
                setPlayback((prevState) => [res.playedSeconds, prevState[1]]);
                // console.log("res: ", res);
                // for (let i in audioList) {
                //   audioRef.current[i].seekTo(res.played);
                // }
                // console.log(
                //   "audioref 0: ",
                //   audioRef.current[0].player.prevPlayed
                // );
                for (let i in Object.keys(audioUrls).length) {
                  if (
                    audioRef.current[i].player.prevPlayed >
                    res.playedSeconds + 0.1
                  ) {
                    console.log("reseting...");
                    audioRef.current[i].seekTo(res.played);
                  }
                }
                if (res.loadedSeconds - res.playedSeconds < 1) {
                  if (res.loaded !== 1) {
                    setShowLoader(true);
                    // console.log("bool res: ", [false, contentLoaded[1]]);
                    // setContentLoaded((prevState) => [false, prevState[1]]);
                  }
                } else {
                  setShowLoader(false);
                  // setContentLoaded((prevState) => [true, prevState[1]]);
                }
              }}
            />
            {/* Different audio players */}
            {Object.keys(audioUrls).map((item, index) => (
              <ReactPlayer
                key={index}
                url={audioUrls[item]}
                ref={(el) => (audioRef.current[index] = el)}
                playing={!showLoader && play}
                // width={"100%"}
                height={"40px"}
                progressInterval={100}
                // onProgress={(res) => {
                //   if (res.loadedSeconds - res.playedSeconds < 5) {
                //     if (res.loaded !== 1) {
                //       setShowLoader(true);
                //       // console.log("audio bool res: ", [contentLoaded[0], false]);
                //       // setContentLoaded((prevState) => [prevState[0], false]);
                //     }
                //   } else {
                //     setShowLoader(false);
                //     // setContentLoaded((prevState) => [prevState[0], true]);
                //   }
                //   // console.log("audio res: ", res);
                // }}
                volume={audioList === index ? 1 : 0}
                style={{ display: "none" }}
              />
            ))}
            {/* Center Buttons: Play, Pause and Loader */}
            {(thumbnail ? !displayThumbnail : true) && !play ? (
              <Box
                sx={{
                  position: "absolute",
                  zIndex: 10,
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  borderRadius: "12px",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconButton
                  sx={{
                    color: "white",
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    p: "4px",
                    backgroundColor: "rgba(168, 168, 168, 0.6)",
                    "&:hover": {
                      backgroundColor: "rgba(168, 168, 168, 0.8)",
                    },
                  }}
                  onClick={() => setPlay(true)}
                >
                  <PlayArrowIcon sx={{ fontSize: "44px" }} />
                </IconButton>
              </Box>
            ) : showLoader ? (
              <Box
                sx={{
                  position: "absolute",
                  zIndex: 0,
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress size="50px" color="inherit" />
              </Box>
            ) : null}
            {/* Bottom-right Button: Pause Icon */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
                position: "absolute",
                bottom: 10,
                right: 10,
              }}
            >
              {/* Restart */}
              {play ? (
                <>
                  {/* Restart */}
                  <IconButton
                    sx={{
                      color: "white",
                      bgcolor: "rgba(125, 125, 125, 0.3)",
                      "&:hover": {
                        bgcolor: "rgba(125, 125, 125, 0.6)",
                      },
                    }}
                    onClick={() => {
                      videoRef.current.seekTo(0);
                      console.log("len: ", Object.keys(audioUrls).length);
                      Object.keys(audioUrls).map((item, i) => {
                        console.log("audioRef: ", audioRef.current[i]);
                        audioRef.current[i].seekTo(0);
                      });
                    }}
                  >
                    <RestartAltIcon fontSize="large" />
                  </IconButton>
                  {/* Play/Pause */}
                  <IconButton
                    aria-label="mute-unmute"
                    sx={{
                      color: "white",
                      bgcolor: "rgba(125, 125, 125, 0.3)",
                      "&:hover": {
                        bgcolor: "rgba(125, 125, 125, 0.6)",
                      },
                    }}
                    onClick={() => setPlay((prevState) => !prevState)}
                  >
                    <PauseIcon fontSize={"large"} />
                  </IconButton>
                </>
              ) : null}
            </Box>
            {/* Playback Time */}
            <Box
              sx={{
                position: "absolute",
                zIndex: 20,
                bottom: 10,
                left: 10,
                color: "white",
                bgcolor: "rgba(125, 125, 125, 0.3)",
                px: 1,
                borderRadius: 2,
              }}
            >
              {playback[0] !== 0
                ? Math.floor(playback[0] / 60)
                    .toString()
                    .padStart(2, "0") +
                  ":" +
                  Math.floor(playback[0] % 60)
                    .toString()
                    .padStart(2, "0")
                : "00:00"}{" "}
              /{" "}
              {playback[1] !== 0
                ? Math.floor(playback[1] / 60)
                    .toString()
                    .padStart(2, "0") +
                  ":" +
                  Math.floor(playback[1] % 60)
                    .toString()
                    .padStart(2, "0")
                : "00:00"}
            </Box>
          </>
        )}
      </div>

      {/* Multiple Audio Buttons */}
      <div className="w-full mt-3 grid grid-cols-2 md:flex md:justify-center md:flex-wrap gap-3 bg-[#aaa] p-2 rounded-xl bg-opacity-15">
        {Object.keys(audioUrls).map((item, index) => (
          <Button
            key={index}
            variant={currentLang === item ? "filled" : "white"}
            color={currentLang === item ? "#50c4b7" : "black"}
            c="black"
            tt="uppercase"
            px={8}
            onClick={() => {
              // setShowLoader(true);
              setCurrentLang(item);
              setAudioList(index);
            }}
          >
            {flagList ? (
              <Image src={flagList[index]} alt="" className="w-6 mr-2" />
            ) : null}
            {buttonsName ? buttonsName[index] : item}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MultiAudioPlayer;
