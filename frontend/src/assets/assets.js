import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
      speciality: 'General physician',
      image: General_physician
    },
    {
      speciality: 'Gynecologist',
      image: Gynecologist
    },
    {
      speciality: 'Dermatologist',
      image: Dermatologist
    },
    {
      speciality: 'Pediatricians',
      image: Pediatricians
    },
    {
      speciality: 'Neurologist',
      image: Neurologist
    },
    {
      speciality: 'Gastroenterologist',
      image: Gastroenterologist
    },
  ];
  
  export const doctors = [
    {
      _id: 'doc1',
      name: 'Dr. Vikram Kapoor',
      image: doc1,
      speciality: 'General physician',
      degree: 'MBBS',
      experience: '4 Years',
      about:
        'Dr. Vikram Kapoor is dedicated to providing compassionate and comprehensive care, emphasizing preventive medicine and personalized treatment.',
      fees: 3000, // in INR
      address: {
        line1: 'Plot No. 12, MG Road',
        line2: 'Pune, Maharashtra'
      }
    },
    {
      _id: 'doc2',
      name: 'Dr. Priya Singh',
      image: doc2,
      speciality: 'Gynecologist',
      degree: 'MBBS',
      experience: '3 Years',
      about:
        'Dr. Priya Singh focuses on women’s health with a blend of expertise and empathy, ensuring safe and attentive gynecological care.',
      fees: 3500,
      address: {
        line1: 'Block A, Connaught Place',
        line2: 'New Delhi, Delhi'
      }
    },
    {
      _id: 'doc3',
      name: 'Dr. Neha Patel',
      image: doc3,
      speciality: 'Dermatologist',
      degree: 'MBBS',
      experience: '1 Year',
      about:
        'Dr. Neha Patel is committed to effective skin care, combining modern techniques with holistic approaches for healthy skin.',
      fees: 2000,
      address: {
        line1: 'Sector 15',
        line2: 'Gurgaon, Haryana'
      }
    },
    {
      _id: 'doc4',
      name: 'Dr. Aakash Kumar',
      image: doc4,
      speciality: 'Pediatricians',
      degree: 'MBBS',
      experience: '2 Years',
      about:
        'Dr. Aakash Kumar provides gentle and attentive care for children, ensuring their growth and well‐being with an empathetic approach.',
      fees: 2500,
      address: {
        line1: 'Banjara Hills',
        line2: 'Hyderabad, Telangana'
      }
    },
    {
      _id: 'doc5',
      name: 'Dr. Rohan Verma',
      image: doc5,
      speciality: 'Neurologist',
      degree: 'MBBS',
      experience: '4 Years',
      about:
        'Dr. Rohan Verma is skilled in neurological care, focusing on early diagnosis and innovative treatments for optimum patient care.',
      fees: 3000,
      address: {
        line1: 'Jubilee Hills',
        line2: 'Hyderabad, Telangana'
      }
    },
    {
      _id: 'doc6',
      name: 'Dr. Pooja Gupta',
      image: doc6,
      speciality: 'Neurologist',
      degree: 'MBBS',
      experience: '4 Years',
      about:
        'Dr. Pooja Gupta combines expertise and empathy to provide advanced neurological care tailored to each patient’s needs.',
      fees: 3000,
      address: {
        line1: 'Andheri',
        line2: 'Mumbai, Maharashtra'
      }
    },
    {
      _id: 'doc7',
      name: 'Dr. Sanjay Reddy',
      image: doc7,
      speciality: 'General physician',
      degree: 'MBBS',
      experience: '4 Years',
      about:
        'Dr. Sanjay Reddy is known for his comprehensive approach to general healthcare, providing personalized care with a focus on preventive measures.',
      fees: 3000,
      address: {
        line1: 'Electronic City',
        line2: 'Bengaluru, Karnataka'
      }
    },
    {
      _id: 'doc8',
      name: 'Dr. Meera Sharma',
      image: doc8,
      speciality: 'Gynecologist',
      degree: 'MBBS',
      experience: '3 Years',
      about:
        'Dr. Meera Sharma is passionate about women’s health, offering holistic care and guidance through every stage of life.',
      fees: 3500,
      address: {
        line1: 'Bandra',
        line2: 'Mumbai, Maharashtra'
      }
    },
    {
      _id: 'doc9',
      name: 'Dr. Anjali Verma',
      image: doc9,
      speciality: 'Dermatologist',
      degree: 'MBBS',
      experience: '1 Year',
      about:
        'Dr. Anjali Verma ensures that every patient receives expert skin care with modern treatments and personalized attention.',
      fees: 2000,
      address: {
        line1: 'Indiranagar',
        line2: 'Bengaluru, Karnataka'
      }
    },
    {
      _id: 'doc10',
      name: 'Dr. Rohit Kapoor',
      image: doc10,
      speciality: 'Pediatricians',
      degree: 'MBBS',
      experience: '2 Years',
      about:
        'Dr. Rohit Kapoor is an expert in pediatric care, known for his gentle and effective treatment methods for children.',
      fees: 2500,
      address: {
        line1: 'Bandra Kurla Complex (BKC)',
        line2: 'Mumbai, Maharashtra'
      }
    },
    {
      _id: 'doc11',
      name: 'Dr. Ritu Kaur',
      image: doc11,
      speciality: 'Neurologist',
      degree: 'MBBS',
      experience: '4 Years',
      about:
        'Dr. Ritu Kaur combines clinical expertise with compassionate care to manage and treat neurological conditions effectively.',
      fees: 3000,
      address: {
        line1: 'Connaught Place',
        line2: 'New Delhi, Delhi'
      }
    },
    {
      _id: 'doc12',
      name: 'Dr. Arjun Desai',
      image: doc12,
      speciality: 'Neurologist',
      degree: 'MBBS',
      experience: '4 Years',
      about:
        'Dr. Arjun Desai is dedicated to advancing neurological healthcare with a personalized treatment plan for each patient.',
      fees: 3000,
      address: {
        line1: 'Punjabi Bagh',
        line2: 'New Delhi, Delhi'
      }
    },
    {
      _id: 'doc13',
      name: 'Dr. Kiran Malhotra',
      image: doc13,
      speciality: 'General physician',
      degree: 'MBBS',
      experience: '4 Years',
      about:
        'Dr. Kiran Malhotra is committed to providing effective general healthcare services with a focus on early intervention and prevention.',
      fees: 3000,
      address: {
        line1: 'Koramangala',
        line2: 'Bengaluru, Karnataka'
      }
    },
    {
      _id: 'doc14',
      name: 'Dr. Sanjana Rao',
      image: doc14,
      speciality: 'Gynecologist',
      degree: 'MBBS',
      experience: '3 Years',
      about:
        'Dr. Sanjana Rao offers comprehensive gynecological care, focusing on patient education and a holistic approach to women’s health.',
      fees: 3500,
      address: {
        line1: 'Whitefield',
        line2: 'Bengaluru, Karnataka'
      }
    },
    {
      _id: 'doc15',
      name: 'Dr. Rahul Sharma',
      image: doc15,
      speciality: 'Dermatologist',
      degree: 'MBBS',
      experience: '1 Year',
      about:
        'Dr. Rahul Sharma specializes in dermatology, using the latest treatments to help patients achieve healthy, glowing skin.',
      fees: 2000,
      address: {
        line1: 'Juhu',
        line2: 'Mumbai, Maharashtra'
      }
    },
  ];
  