import { Router } from 'express';
import mergefreeze from './mergefreeze';

export default function() {
    let api = Router();

    api.use('/mergefreeze', mergefreeze);

    // perhaps expose some API metadata at the root
    api.get('/', (req, res) => {
        res.json({
            version : '1.0'
        });
    });

    return api;
}
