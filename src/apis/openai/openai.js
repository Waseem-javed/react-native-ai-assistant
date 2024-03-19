import axios from 'axios';
import {APIKEY} from '../../constants';

const headers = {
  Authorization: `Bearer ${APIKEY}`,
  'Content-Type': 'application/json',
};

const client = axios.create({
  headers: JSON.stringify(headers),
});

const gptEndpoint = 'https://api.openai.com/v1/chat/completions';
const dalleEndpoint = 'https://api.openai.com/v1/images/generations';

export const apiCall = async (prompt, messages) => {
  try {
    const res = await client.post(gptEndpoint, {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Dose this message want to generate an AI picture, image, art or anything similar? ${prompt}. Simply answer with a yes or not.`,
        },
      ],
    });
    let isArt = res.data.choices[0].message.content;
    if (isArt.toLowerCase().includes('yes')) {
      return dallApiCall(prompt, messages || []);
    } else {
      return gptApiCall(prompt, messages || []);
    }
  } catch (err) {
    console.log('error', err.message);
    return Promise.resolve({success: false, msg: err.message});
  }
};

export const gptApiCall = async (prompt, messages) => {
  try {
    const res = await client.post(gptEndpoint, {
      model: 'gpt-3.5-turbo',
      messages: messages,
    });
    let answer = res.data.choices[0].message.content;
    messages.push({role: 'assistant', content: answer.trim()});
    return Promise.resolve({succes: true, data: messages});
  } catch (err) {
    console.log('error', err.message);
    return Promise.resolve({success: false, msg: err.message});
  }
};

export const dallApiCall = async (prompt, messages) => {
  try {
    const res = await client.post(dalleEndpoint, {
      prompt,
      n: 1,
      size: '512x512',
    });
    let url = res.data.data[0].url;
    messages.push({role: 'assistant', content: url});
    return Promise.resolve({succes: true, data: messages});
  } catch (err) {
    console.log('error', err.message);
    return Promise.resolve({success: false, msg: err.message});
  }
};
