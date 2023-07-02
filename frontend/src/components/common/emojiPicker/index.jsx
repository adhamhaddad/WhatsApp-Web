import React from 'react';
import { Picker } from 'emoji-mart';

const EmojiPicker = ({ onSelect }) => {
  const handleSelect = (emoji) => {
    onSelect(emoji.native);
  };

  return (
    <Picker
      set='emojione'
      emojiSize={24}
      showPreview={false}
      showSkinTones={false}
      onSelect={handleSelect}
      className='emoji-picker'
      emoji='point_up'
    />
  );
};

export default EmojiPicker;
