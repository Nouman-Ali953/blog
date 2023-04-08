import multer from 'multer';

import {GridFsStorage} from 'multer-gridfs-storage';

const storage = GridFsStorage({
    url : `mongodb+srv://nauman:blogsite@blogsite.cmwpwxn.mongodb.net/test`,
    options : {useNewUrlParser: true},
    file : (request , file )=>{
        const match = ['image/png' , 'image/jpg']
        
        if (match.indexOf(file.mimeType) === -1) {
            return `${Date.now()}-blog-${file.originalname}`;
        }

        return {
            bucketName : "photos",
            filename : `${Date.now()}-blog-${file.originalname}`
        }

    }

})

export default multer({storage});