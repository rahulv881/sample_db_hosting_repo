import axios from "axios";
import jwkToPem from "jwk-to-pem";
import jwt from "jsonwebtoken";

import { GlobalUtils } from "../../utils";
import { CONSTANT_CONFIG } from "../../../config/CONSTANT_CONFIG";

export const cognitoAuth = {
    validateUser: async (object, options) => {
        var res = GlobalUtils.responseObject();

        let token = options.headers['authorization'];
        if (token) {
            token = token.replace(/^Bearer\s/, '');
        } else {
            res.success = false;
            res.message = "Token not provided";

            return res;
        }

        // const checkCognitoAuth = await request({
        //     url: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}/.well-known/jwks.json`,
        //     json: true
        // });

        const cognitoRes = await axios.get(`https://cognito-idp.${CONSTANT_CONFIG.AWS.REGION}.amazonaws.com/${CONSTANT_CONFIG.COGNITO.USER_POOL_ID}/.well-known/jwks.json`)

        if (cognitoRes.status == 200) {
            let pems = {};
            let pem = null;
            const keys = cognitoRes?.data['keys'];
            for (let i = 0; i < keys.length; i++) {
                let key_id = keys[i].kid;
                let modulus = keys[i].n;
                let exponent = keys[i].e;
                let key_type = keys[i].kty;
                let jwk = { kty: key_type, n: modulus, e: exponent };
                pem = jwkToPem(jwk);
                pems[key_id] = pem;
            }
            const decodedJwt = await jwt.decode(token, { complete: true });
            if (!decodedJwt) {
                res.success = false;
                res.message = "Not a valid JWT token";

                return res;
            }
            const kid = decodedJwt.header.kid;
            pem = pems[kid];
            if (!pem) {
                res.success = false;
                res.message = "Invalid token";

                return res;
            }

            try {
                let verifyJwt = await jwt.verify(token, pem);
                verifyJwt.isMiddleware = true;
                return verifyJwt;

            } catch (err) {
                res.success = false;
                res.message = "Invalid token";

                return res;
            }
        } else {
            res.success = false;
            res.message = "Error! Unable to download JWKs";

            return res;
        }

    }
}