// Import the NFTStorage class and File constructor from the 'nft.storage' package
//require('dotenv').config();
const key =  process.env.NEXT_APP_NFTSTORAGE_KEY
import { NFTStorage } from 'nft.storage'

// Paste your NFT.Storage API key into the quotes:
const NFT_STORAGE_KEY = key;

/**
  * Reads an image file from `imagePath` and stores an NFT with the given name and description.
  */
export function storeNFT(imagePath, name, description) {
    try {
    // load the file from disk
    const image = makeblob(imagePath)
    //console.log(image);

    // create a new NFTStorage client using our API key
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })

    // call client.store, passing in the image & metadata
    return nftstorage.store({
        image,
        name,
        description,
    })
} catch(error) {
    return error;
}
}

/**
  * A helper to read a file from a location on disk and return a File object.
  * Note that this reads the entire file into memory and should not be used for
  * very large files. 
  *   a File object containing the file content
  */
/*async function fileFromPath(filePath) {
    //const content = fs.readFile(filePath)
    const type = mime.getType(filePath)
    return new File([filePath], path.basename(filePath), { type })
}*/

function makeblob(dataURL) {
    const BASE64_MARKER = ';base64,';
    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
}

 