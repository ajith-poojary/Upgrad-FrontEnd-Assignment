import axios from "axios";

async function sendAddress(address) {
  try {
    const r = await axios.post(
      `http://localhost:8080/api/addresses`,
      {
        id: "641d2d0c2dce9f1bf11104d3",
        name: address.name,
        contactNumber: address.mobile,
        city: address.city,
        landmark: address.landmark,
        street: address.city,
        state: address.state,
        zipcode: address.zip,
        user: "641a9519920b811787e47429",
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt_token"),
        },
      }
    );
    return r.data;
  } catch (e) {
    if (e.response.status) {
      console.log(e);
      return e.response.status;
    }
  } finally {
    console.log(`Finally running sendAddress`);
  }
}

export default sendAddress;
