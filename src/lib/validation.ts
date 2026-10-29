import type { Profile } from '../types';
export const states = ['Andaman and Nicobar Islands','Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chandigarh','Chhattisgarh','Dadra and Nagar Haveli and Daman and Diu','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jammu and Kashmir','Jharkhand','Karnataka','Kerala','Ladakh','Lakshadweep','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Puducherry','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal'];
export const fields = [
 {key:'state',label:'State or union territory',help:'Your home state helps compare geographic coverage. These initial schemes have national coverage.',options:states,required:true},
 {key:'level',label:'Education level',help:'Schemes support specific degree levels.',options:['Undergraduate','Postgraduate','Diploma'],required:true},
 {key:'course',label:'Course or field',help:'AICTE schemes are intended for technical courses.',options:['Technical','Arts and humanities','Science','Commerce','Medicine','Other'],required:true},
 {key:'year',label:'Current academic year',help:'Some awards accept only first-year or lateral-entry students.',options:['1','2','3','4','5'],required:true},
 {key:'entry',label:'Admission route',help:'Used for first-year / second-year lateral-entry rules.',options:['First year','Second year lateral entry','Other']},
 {key:'institution',label:'Institution recognition',help:'Check your institution’s approval before choosing.',options:['AICTE approved','Other recognized institution','Not recognized']},
 {key:'mode',label:'Study mode',help:'Some schemes require regular, full-time study.',options:['Regular / full time','Distance / part time']},
 {key:'income',label:'Annual family income (optional)',help:'Only a broad bracket; never stored on your device.',options:['low','middle','upper','high']},
 {key:'girl',label:'Applying under a scheme for girl students? (optional)',help:'Used only for the documented Pragati requirement.',options:['Yes','No']},
 {key:'disability',label:'Disability of at least 40%? (optional)',help:'Used only for the documented Saksham criterion. No records requested.',options:['Yes','No']},
 {key:'merit',label:'Above your board’s Class XII 80th percentile?',help:'A percentile is a rank, not a percentage of marks.',options:['Yes','No']},
 {key:'otherFunding',label:'Receiving another scholarship?',help:'Some sources restrict combining financial assistance; confirm current rules.',options:['Yes','No']}
];
export const incomeLabels: Record<string,string> = {low:'Up to ₹2.5 lakh',middle:'₹2.5–4.5 lakh',upper:'₹4.5–8 lakh',high:'Above ₹8 lakh'};
export function validateProfile(profile: Profile) {
 const errors: Record<string,string> = {};
 for (const f of fields) { const v=profile[f.key]; if(f.required && (!v || v==='unknown')) errors[f.key]='Choose an option to continue.'; else if(v && v!=='unknown' && !f.options.includes(v)) errors[f.key]='Choose a valid option.'; }
 if(profile.entry==='First year' && profile.year && profile.year!=='1') errors.entry='First-year entry must agree with current academic year 1.';
 if(profile.entry==='Second year lateral entry' && profile.year && profile.year!=='2') errors.entry='For this fresh-application check, choose lateral entry only in current academic year 2; otherwise choose Other.';
 return errors;
}
