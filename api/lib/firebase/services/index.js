const app = require("../config");
const { getStorage } = require("firebase/storage");
const storage = getStorage(app);
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const response = require("../../helper/responses");

const uplaod = async (file, res, req) => {
  try {
    if (req?.file) {
      console.log(file)
      const uniqueFileName = `images/${new Date().valueOf()}.png`;
      const imageRef = ref(storage, uniqueFileName);
      const metaType = {
        contentType: file?.mimetype,
        name: file?.originalname,
      };
      await uploadBytes(imageRef, file?.buffer, metaType)
        .then(async () => {
          let publicUrl = await getDownloadURL(imageRef);
          return publicUrl
        })
        .catch((e) => {
          console.error(e);
          return response.failedWithMessage(e.message, res);
        });
    }
    return null;
  } catch (err) {
    console.log("ERROR---->", err);
    throw new Error();
  }
};



module.exports = {
  uplaod,
};
