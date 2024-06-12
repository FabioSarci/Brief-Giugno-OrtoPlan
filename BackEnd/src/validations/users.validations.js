import validate from "validate.js";
import fs from "fs";
import prisma from "../../db/prisma.js";
import moment from 'moment';

const DB_PATH = "./db/users.json";

validate.validators.userExists = function (value, options, key, attributes) {
    return new Promise(async (res, rej) => {
      const user = await prisma.user.findFirst({ where: { email: value } });
      if (user) {
        res("l'utente esiste già nel sistema");
      } else {
        res();
      }
    });
  };

  validate.extend(validate.validators.datetime, {
    parse: function(value, options) {
      return +moment.utc(value);
    },
    format: function(value, options) {
      var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
      return moment.utc(value).format(format);
    }
  });


export function createUserValidation(req,res,next){
    validate.async(req.body,{
      
        firstName:{
            presence: {allowEmpty: false},
            length: {minimum: 5},
        },
        lastName:{
            presence: {allowEmpty: false},
            length: {minimum: 5},
        },
        password: {
          presence: {allowEmpty: false},
        },
        conferma:{
          equality: 'password'
        },
        datanascita:{
          datetime:{
            dateOnly: true,
            latest: moment.utc().subtract(18, 'years'),
            message: "^You need to be at least 18 years old"
          }
        },
        email: {
          userExists: {},
        },
    }).then(
      () => {
        // on success
        next();
      },
      (errors) => {
        // on error
        res.status(403);
        res.json({isError:true, error: errors})
      }
    );
};


export function updateUserValidation(req, res, next){
  validate.async(req.body,{
      firstName:{
        presence: {allowEmpty: false},
        length: {minimum: 5},
    },
    lastName:{
        presence: {allowEmpty: false},
        length: {minimum: 5},
    },
    datanascita:{
      datetime:{
        dateOnly: true,
        latest: moment.utc().subtract(18, 'years'),
        message: "^You need to be at least 18 years old"
      }
    },
  }).then(
  () => {
    // on success
    next();
  },
  (errors) => {
    // on error
      res.status(403);
      res.json({isError:true, error: errors})
    }
  );
};