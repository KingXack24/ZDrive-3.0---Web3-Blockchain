import {useState} from 'react'
import axios from 'axios'

import './FileUpload.css';

const FileUpload = ({account,contract,provider}) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No Image Selected");
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(file){
     try {

      const formData = new FormData();
      formData.append("file", file);
//get Key from  Pinta/Developers
      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: `ce5566fa1ca3fc412b1d`,
          pinata_secret_api_key: `
          023acdea9119d01976564a4faca55ec3b6c8f91d248ec121b73aa2d124baee58`,
          "Content-Type": "multipart/form-data",
        },
      });

      const ImgHash = `ipfs://${resFile.data.IpfsHash}`;  // will get from ipfs documentation
      //const signer = contract.connect(provider.getSigner());
      const signer = contract.connect(provider.getSigner());
      // signer.add(account, ImgHash);
    signer.add(account, ImgHash);
      alert("Successfully Image Uploaded");
      setFileName("No image selected");
      setFile(null);



     }catch(e) {
      alert("Unable to upload image to file");
     }
    }

  }
  const retrieveFile = (e)=> {
    const data = e.target.files[0] // files: an array of files
    // console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloader=()=> {
      setFile(e.target.file[0]);
          }
          setFileName(e.target.files[0].name);
          e.preventDefault();

  }
  return (
    <div className='top'>
    <form className='form' onSubmit={handleSubmit}>
      <label htmlFor='file-upload' className='choose'>
      Choose Image
      </label>
      <input disabled={!account} type="file" id='file-upload' name='data' onChange={retrieveFile}/>
      <span className='textArea'>Image: {fileName}</span>
      <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>

    </form>
    
    </div>
  )
}

export default FileUpload