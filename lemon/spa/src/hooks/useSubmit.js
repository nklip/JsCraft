import {useState} from "react";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * This is a custom hook that can be used to submit a form and simulate an API call
 * It uses Math.random() to simulate a random success or failure, with 50% chance of each
 */
const useSubmit = () => {
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState(false);

  const submit = async (url, data) => {
    url = process.env.REACT_APP_DB + url;
    const random = Math.random();
    setLoading(true);
    console.log("INCOMING DATA: " + JSON.stringify(data));
    try {
      let success = false;
      // guests comes off the form as a string, so compare numerically rather
      // than swapping == for === , which would never match
      const guests = Number(data.guests);
      if (guests === 2) { // always success
        success = true;
      } else if (guests === 4) { // random
        await wait(2000);
        if (random < 0.5) {
          throw new Error("Something went wrong");
        }
        success = true;
      }

      await wait(200); // network simulation

      if (success === true) {
        // ad-hoc id generation
        data['id'] = Math.random().toString(16).slice(2);

        // convert incoming data to json
        const json = JSON.stringify(data);
        // add headers and specify the method
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: json
        };
        // call POST method
        const response = fetch(url, requestOptions);
        // print response
        console.log("RESPONSE: " + JSON.stringify(response));

        // set response for user to see
        setResponse({
          type: 'success',
          message: `Thanks for your submission ${data.name}, we will get back to you shortly!`,
        });
      } else {
        setResponse({
          type: 'error',
          message: "Unfortunatelly we don't have capacity for your request. Please choose another day!",
        });
      }

    } catch (error) {
      setResponse({
        type: 'error',
        message: 'Something went wrong, please try again later!',
      });
    } finally {
      setLoading(false);
    }
  };

  return {isLoading, response, submit };
}

export default useSubmit;
