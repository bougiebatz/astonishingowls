var express = require('express');

var google = require('googleapis');
var prediction = google.prediction('v1.6');
var key = {
  "type": "service_account",
  "project_id": "currency-147719",
  "private_key_id": "88e04d6a72e829ee12ece679ec86561a06d7dbe6",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCbcTi2PlqmodWJ\nJXUiG1/gHdWTnzSgkw6ja0+0AN0jtueJvxk2YYLCV5pGZu9H7o+/W1n58NU32jm+\nyMYTYF2cgmu8q4flUS7kWwVMLL7mPrYBu4z6nB/s8TkxGvmRFNYOLMePyqvlT8FX\n0EkasHAb8UgMdwk0E2CQ0+hQ4CtIU8mrwiYEzN5NYnD+SJATXm4nhcwQo5+oZUYH\nmi5FcAsA3enFVOcI+fvSskWIszKAQ1rc9EkGFhhfSyrY8rt+QGKdp+d1GLfxB2sT\n3xByrvWGwSRZx21getcLeG+WqI/ldIq4lKXEcmLNexNyqaTqnNDmiVspV0Md0zLm\nrjiGPaY5AgMBAAECggEBAJsz5Ugx4hlWpPsW52lyo7wGjeWjpMxfiNIqp5427pZm\nXbDvmaDuo7yf824wAOJ1lBmggKpKiNoHjnirxvo50b4fiqsLKdkRwhxHtXZlhwYl\nv1zjgtQHZukRweUB5gWyJDhrBabQ2elQROAFG7kGSincM/AeOpZAcr6oluGJsi23\nzNfTRu/6nHnJ37Vju7t5MJq+Z91w35k7JNEwpDy03qMilrl3f24jfacdHThJ21Jo\n0SwbQhnSn8UuBRTWfefkuHMASRAHVmB6ndOXvpPz9h8rL9rYCRITHHNt9GdytGHo\nk5+NX6R8MNITB6bo8+SwExvG3YM5tyMw2rQjNjhShvECgYEAybKmPih/IaFOUQgG\npgPWPx2Cxck0BfGi+mRQh9dlhHfIMju/unS8LGRNAzx5nU8vuGrxZSF4PDpdc23y\nFd61PThn7uq/7DPoZekrQ6pvdF6gc0K1eCjsuEZo3Nq8tA6NyqhyMb29VffOw98o\nfK01ObWgxwSwhO01l/5lbKAkrysCgYEAxUqPmkq/VJcFjMV/bPd1282QZuVUihqO\niV8RixYDCEPBaL6/uE0vIegB/zCbt+pf4KVihwtEO4pjjzBuMavdVSgvYf86DVLs\niyTT7yn7JGDBgOI1ayeDrCnAgAM0mGv0A7ZuaoEhCbYwKVqiVmXLZmH9xyJ6qpwP\nlYkxvIiPrisCgYA1811YXwiyfC0wq47rtTcHpuMl+I270Uig5VhNHaZ/6nJYTXcZ\nbsQus52N8g0tsNK455IuVOeOZKY+i/gnNW0RNRdH5u7zRWcya04xSVOKsw0EB6H2\nxCudlufRu4iiOQpgXPI+r9wHNMPPzM9Nmh8Ukqqw0WZOCA0/3MJQbf2iBQKBgBdg\nJzWbx6GpJyIvwFJT26YIbCSU5XhbfyntlrGJESDojkDv4N1gX8Y/rATlaH3ZCjUe\nw1bG0fXQBs3Pai7+cwIE+eA9kk5D1f0Chw3eRoBf6m1v3+5rRyGd7M3+EzxABjBu\nbBS4agaxjHFJ6NQdyYS+9YejoS8XwIzyLW9uKr/zAoGAcl/SRspzUrUKPWijIsiu\ni9dRlMv4vcHOQES3ed9cj29HX+46JyyL1pb/2RopwGEiIphHl55j52+mmwvRcejy\nnVrjb+qC1y9cioSXEvhba4EuPaKIoxIKGbtXBS5h8+9nali6oj5k31c9W9dAHZ7z\nsCzMBYqPlrVCuj+GbE2Feeg=\n-----END PRIVATE KEY-----\n",
  "client_email": "currency-147719@appspot.gserviceaccount.com",
  "client_id": "111119755853355569803",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/currency-147719%40appspot.gserviceaccount.com"
}


var jwtClient = new google.auth.JWT(
  process.env.client_email || key.client_email,
  null,
  process.env.private_key || key.private_key,
  ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/prediction'],
  null
);


module.exports = function(app,express){
  app.get('/api/predict', (req,res) => {
    jwtClient.authorize(function (err, tokens) {
      if (err) {
        console.log(err);
        return;
      }

      var request = {
        // TODO: Change placeholders below to appropriate parameter values for the 'predict' method:

        // * The project associated with the model.
        project: "currency-147719",


        // Auth client
        auth: jwtClient
      };

       prediction.trainedmodels.list(request, function(err, result) {
           if (err) {
             console.log(err);
           } else {
             console.log(result);
             res.send(result);
           }
         });
     });
  });


  app.post('/api/predict', (req,res) => {
    jwtClient.authorize(function (err, tokens) {
      if (err) {
        console.log(err);
        return;
      }

      var request = {
        // TODO: Change placeholders below to appropriate parameter values for the 'predict' method:

        // * The project associated with the model.
        project: "currency-147719",

        // * The name of a trained model.
        id: req.body.currency,

        resource: req.body.query,

        // Auth client
        auth: jwtClient
      };

      prediction.trainedmodels.predict(request, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log(result, 'this is the result');
          res.send(result);
        }
      });
    });
  });


};
