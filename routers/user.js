const User = require("../models").user
const Report = require("../models").report
const Action = require("../models").action
const { Router } = require("express");
const nodemailer = require('nodemailer');

const user = "Merijn@risottini.com";
const pass = "Ithaka1!GL";
const from = "Merijn@risottini.com";
const cc = "merijn@risottini.com";
const bcc = "daan@risottini.com";

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user,
      pass: pass,
    }
  });

const router = new Router();

router.get("/", async (req,res,next) => {
    try {
        const user = await User.findAll({include: [Report, Action]})
        
        console.log(user)
        return res.status(200).send(user)
      } catch(error) {
        console.log(error)
    }
})

router.get('/sendEmail',async (req,res)=>{
    try {
        const user = await User.findAll({include: [Report, Action]})

        user.map((val)=>{

            val.actions.map((value)=>{
                const currentDate = new Date();
                let taskDate = new Date(value.due_date);
                if(taskDate >= currentDate){
                    
                    let mailOptions = {
                        from: from,
                        to: val.email,
                        cc : cc,
                        bcc : bcc,
                        subject: 'Your Task Is Due Date',
                        text: value.note,
                      };
                      
                      transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                        }
                      });
                }
                
            });
        });

        return res.status(200).send({status : true , message : "emails send"})
      } catch(error) {
        console.log(error)
    } 
});

router.get("/:id", async (req,res,next) => {
    const id = req.params.id
    try {
        const user = await User.findByPk(id)
        const UserName = user.dataValues.name
        return res.status(200).send(UserName)
      } catch(error) {
        console.log(error)
    }
})

router.get("/:email", async (req, res, next) => {
    const email = req.params.email
    try {
        const user = await User.findOne({where: {email}})
        const userId = user.datavalues.id
        if(!user) {
            return res.status(404).send("No user found matching this email")
        }
        return res.status(200).send(userId)
    } catch(error) {
        console.log(error)
    }
})

module.exports = router; 