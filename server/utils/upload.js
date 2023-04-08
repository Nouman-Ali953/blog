import multer from 'multer';

import {GridFsStorage} from 'multer-gridfs-storage';

const storage = GridFsStorage({
    // url : `mongodb+srv://nouman:Blog_Site@blog.adyxkdz.mongodb.net/?retryWrites=true&w=majority`,
    url : `mongodb+srv://nauman:MernSitE@cluster0.jvrwfax.mongodb.net/?retryWrites=true&w=majority`,
    // url : `mongodb://0.0.0.0:27017/newTest`,
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