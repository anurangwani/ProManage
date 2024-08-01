// import * as actionTypes from './types';
// import { request } from '@/request';

// const dispatchSettingsData = (datas) => {
//   const settingsCategory = {};

//   datas.map((data) => {
//     settingsCategory[data.settingCategory] = {
//       ...settingsCategory[data.settingCategory],
//       [data.settingKey]: data.settingValue,
//     };
//   });

//   return settingsCategory;
// };

// export const settingsAction = {
//   resetState: () => (dispatch) => {
//     dispatch({
//       type: actionTypes.RESET_STATE,
//     });
//   },
//   updateCurrency:
//     ({ data }) =>
//     async (dispatch) => {
//       dispatch({
//         type: actionTypes.UPDATE_CURRENCY,
//         payload: data,
//       });
//     },
//   update:
//     ({ entity, settingKey, jsonData }) =>
//     async (dispatch) => {
//       dispatch({
//         type: actionTypes.REQUEST_LOADING,
//       });
//       let data = await request.patch({
//         entity: entity + '/updateBySettingKey/' + settingKey,
//         jsonData,
//       });

//       if (data.success === true) {
//         dispatch({
//           type: actionTypes.REQUEST_LOADING,
//         });

//         let data = await request.listAll({ entity });

//         if (data.success === true) {
//           const payload = dispatchSettingsData(data.result);
//           window.localStorage.setItem(
//             'settings',
//             JSON.stringify(dispatchSettingsData(data.result))
//           );

//           dispatch({
//             type: actionTypes.REQUEST_SUCCESS,
//             payload,
//           });
//         } else {
//           dispatch({
//             type: actionTypes.REQUEST_FAILED,
//           });
//         }
//       } else {
//         dispatch({
//           type: actionTypes.REQUEST_FAILED,
//         });
//       }
//     },
//   updateMany:
//     ({ entity, jsonData }) =>
//     async (dispatch) => {
//       dispatch({
//         type: actionTypes.REQUEST_LOADING,
//       });
//       let data = await request.patch({
//         entity: entity + '/updateManySetting',
//         jsonData,
//       });

//       if (data.success === true) {
//         dispatch({
//           type: actionTypes.REQUEST_LOADING,
//         });

//         let data = await request.listAll({ entity });

//         if (data.success === true) {
//           const payload = dispatchSettingsData(data.result);
//           window.localStorage.setItem(
//             'settings',
//             JSON.stringify(dispatchSettingsData(data.result))
//           );

//           dispatch({
//             type: actionTypes.REQUEST_SUCCESS,
//             payload,
//           });
//         } else {
//           dispatch({
//             type: actionTypes.REQUEST_FAILED,
//           });
//         }
//       } else {
//         dispatch({
//           type: actionTypes.REQUEST_FAILED,
//         });
//       }
//     },
//   list:
//     ({ entity }) =>
//     async (dispatch) => {
//       dispatch({
//         type: actionTypes.REQUEST_LOADING,
//       });

//       let data = await request.listAll({ entity });

//       if (data.success === true) {
//         const payload = dispatchSettingsData(data.result);
//         window.localStorage.setItem('settings', JSON.stringify(dispatchSettingsData(data.result)));

//         dispatch({
//           type: actionTypes.REQUEST_SUCCESS,
//           payload,
//         });
//       } else {
//         dispatch({
//           type: actionTypes.REQUEST_FAILED,
//         });
//       }
//     },
//   upload:
//     ({ entity, settingKey, jsonData }) =>
//     async (dispatch) => {
//       dispatch({
//         type: actionTypes.REQUEST_LOADING,
//       });

//       let data = await request.upload({
//         entity: entity,
//         id: settingKey,
//         jsonData,
//       });

//       if (data.success === true) {
//         dispatch({
//           type: actionTypes.REQUEST_LOADING,
//         });

//         let data = await request.listAll({ entity });

//         if (data.success === true) {
//           const payload = dispatchSettingsData(data.result);
//           window.localStorage.setItem(
//             'settings',
//             JSON.stringify(dispatchSettingsData(data.result))
//           );
//           dispatch({
//             type: actionTypes.REQUEST_SUCCESS,
//             payload,
//           });
//         } else {
//           dispatch({
//             type: actionTypes.REQUEST_FAILED,
//           });
//         }
//       } else {
//         dispatch({
//           type: actionTypes.REQUEST_FAILED,
//         });
//       }
//     },
// };
import * as actionTypes from './types';
import { request } from '@/request';

const dispatchSettingsData = (datas) => {
  const settingsCategory = {};

  datas.map((data) => {
    settingsCategory[data.settingCategory] = {
      ...settingsCategory[data.settingCategory],
      [data.settingKey]: data.settingValue,
    };
  });

  return settingsCategory;
};

export const settingsAction = {
  resetState: () => (dispatch) => {
    dispatch({
      type: actionTypes.RESET_STATE,
    });
  },
  updateCurrency:
    ({ data }) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.UPDATE_CURRENCY,
        payload: data,
      });
    },
  update:
    ({ entity, settingKey, jsonData }) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.REQUEST_LOADING,
      });
      return request
        .patch({
          entity: `${entity}/updateBySettingKey/${settingKey}`,
          jsonData,
        })
        .then((data) => {
          if (data.success === true) {
            return request.listAll({ entity });
          } else {
            throw new Error('Update failed');
          }
        })
        .then((data) => {
          if (data.success === true) {
            const payload = dispatchSettingsData(data.result);
            window.localStorage.setItem('settings', JSON.stringify(payload));
            dispatch({
              type: actionTypes.REQUEST_SUCCESS,
              payload,
            });
          } else {
            dispatch({
              type: actionTypes.REQUEST_FAILED,
            });
          }
        })
        .catch((error) => {
          dispatch({
            type: actionTypes.REQUEST_FAILED,
          });
          throw error;
        });
    },
  updateMany:
    ({ entity, jsonData }) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.REQUEST_LOADING,
      });
      return request
        .patch({
          entity: `${entity}/updateManySetting`,
          jsonData,
        })
        .then((data) => {
          if (data.success === true) {
            return request.listAll({ entity });
          } else {
            throw new Error('Update many failed');
          }
        })
        .then((data) => {
          if (data.success === true) {
            const payload = dispatchSettingsData(data.result);
            window.localStorage.setItem('settings', JSON.stringify(payload));
            dispatch({
              type: actionTypes.REQUEST_SUCCESS,
              payload,
            });
          } else {
            dispatch({
              type: actionTypes.REQUEST_FAILED,
            });
          }
        })
        .catch((error) => {
          dispatch({
            type: actionTypes.REQUEST_FAILED,
          });
          throw error;
        });
    },
  list:
    ({ entity }) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.REQUEST_LOADING,
      });

      return request
        .listAll({ entity })
        .then((data) => {
          if (data.success === true) {
            const payload = dispatchSettingsData(data.result);
            window.localStorage.setItem('settings', JSON.stringify(payload));
            dispatch({
              type: actionTypes.REQUEST_SUCCESS,
              payload,
            });
          } else {
            dispatch({
              type: actionTypes.REQUEST_FAILED,
            });
          }
        })
        .catch((error) => {
          dispatch({
            type: actionTypes.REQUEST_FAILED,
          });
          throw error;
        });
    },
  upload:
    ({ entity, settingKey, jsonData }) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.REQUEST_LOADING,
      });

      return request
        .upload({
          entity: entity,
          id: settingKey,
          jsonData,
        })
        .then((data) => {
          if (data.success === true) {
            return request.listAll({ entity });
          } else {
            throw new Error('Upload failed');
          }
        })
        .then((data) => {
          if (data.success === true) {
            const payload = dispatchSettingsData(data.result);
            window.localStorage.setItem('settings', JSON.stringify(payload));
            dispatch({
              type: actionTypes.REQUEST_SUCCESS,
              payload,
            });
          } else {
            dispatch({
              type: actionTypes.REQUEST_FAILED,
            });
          }
        })
        .catch((error) => {
          dispatch({
            type: actionTypes.REQUEST_FAILED,
          });
          throw error;
        });
    },
};

