import React from 'react';
import axios from 'axios';
import {ToastAndroid} from 'react-native';

const baseURL = 'http://demovilla.com/micro-poc/api/';

export const apiCall = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}`, {
        params: data,
      })
      .then(
        (res) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        },
      )
      .catch((err) => {
        reject(err);
      });
  });
};
export const showToastWithGravity = (msg) => {
  ToastAndroid.show(msg, ToastAndroid.SHORT);
};
