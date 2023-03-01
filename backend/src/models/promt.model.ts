import {Schema, model} from 'mongoose'

export interface Promt {
   id :  string;
   name : string;
   description : string;
   template : string;
   tags  : string[];
   favorite : boolean;
   stars  : number;
   imageUrl : string;
   origins : string[];
 } 

 export const PromtSchema = new Schema<Promt> (
   {
       name : { type : String, required : true},
       description : { type : String, required : true},
       template : { type : String, required : true},
       tags :  { type : [String] },
       favorite :  { type : Boolean, required : false},
       stars : { type : Number, required : true},
       imageUrl : { type : String, required : true},
       origins  : { type : [String], required : true},
   }, {
      toJSON: {
         virtuals : true
      },
      toObject : {
         virtuals : true
      },
      timestamps : true
   }
 )

 export const PromtModel = model<Promt>('promt', PromtSchema)
