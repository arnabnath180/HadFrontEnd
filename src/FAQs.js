import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQs = () => {
  const faqs = [
    {
      question: 'What is online doctor consultation?',
      answer: 'Online doctor consultation or online medical consultation is a method to connect patients and doctors virtually. It is a convenient and easy way to get online doctor advice using doctor apps or telemedicine apps or platforms, and the internet.',
    },
    {
      question: 'How do I start online consultation with doctors on eMantrana?',
      answer: 'Starting an online doctor consultation is very simple on eMantrana. Follow these steps:  1. Fill in your details and medical history. 2. Search for a doctor and click on Consult Online 3. Connect with the doctor via chat or video call.',
    },
    {
      question: 'Are your online doctors qualified?',
      answer: 'We follow a strict verification process for every doctor providing online consultations on emantrana. We ensure that every doctor is licensed and qualified to practice medicine in their respective fields.',
    },
    {
      question: 'Is online doctor consultation safe and secured on eMantrana?',
      answer: 'The privacy of our patients is critical to us, and thus, we are compliant with all data protection regulations. We use advanced security measures to ensure that your personal information is kept safe and secure.',
    },
  ];

  const faqStyle = {
    position: 'relative',
    bottom: '0',
    right: '0',
    marginBottom: '10px',
    backgroundColor:'lightgray'
  }

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'relative', bottom: '0', right: '0' ,top:'50%',width:'50%'}}>
        <Typography variant="h5" component="h2" gutterBottom>
          FAQs
        </Typography>
        {faqs.map((faq, index) => (
          <Accordion key={index} style={faqStyle}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
