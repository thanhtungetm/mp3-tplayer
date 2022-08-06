const songReducer = (state, action) => {
  const { type, song, volume, mode } = action;
  switch (type) {
    case "SET_SONG": {
      return {
        ...state,
        currentSong: song,
      };
    }
    case "PLAY": {
      return {
        ...state,
        isPlay: true,
      };
    }
    case "PAUSE": {
      return {
        ...state,
        isPlay: false,
      };
    }
    case "TOGGLE": {
      return {
        ...state,
        isPlay: !state.isPlay,
      };
    }
    case "SET_LOADING": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "DISABLE_LOADING": {
      return {
        ...state,
        isLoading: false,
      };
    }
    case "SET_VOLUME": {
      return {
        ...state,
        volume: volume,
      };
    }
    case "SET_MODE": {
      return {
        ...state,
        mode: state.mode === "RA" ? null : state.mode === "RO" ? "RA" : "RO",
      };
    }
    case "TOGGLE_RANDOM":{
      return {
        ...state,
        random: !state.random
      }
    }

    default:
      return state;
  }
};

export default songReducer;
