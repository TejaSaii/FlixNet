import express from 'express';
import { authenticateJwt, getUserDetail} from "../middleware";
import { getVideos, getVideo } from '../controllers';

const router = express.Router();

//route to get all videos considering R rating and pagination
router.get('/videos', authenticateJwt, getUserDetail, getVideos);

//route to get all the details of a single movie/show
router.get('/video/:id', authenticateJwt, getUserDetail, getVideo);

export default router;
