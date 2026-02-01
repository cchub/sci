import axios from 'axios';

const CancelToken = axios.CancelToken;
let cancel;

export const fetchData = async url => {
    cancel && cancel('Operation canceled due to new request.');

    const config = {
        cancelToken: new CancelToken(function executor(c) {
            // An executor function receives a cancel function as a parameter
            cancel = c;
        })
    };
    let response = null

    await axios.get(url, config)
        .then(({ data }) => {
            // console.log(data);
            response = data;
        })
        .catch(error => {
            if (axios.isCancel(error)) {
                // console.log(error);
                return;
            }
            console.log(error)
        });

    return response;
};