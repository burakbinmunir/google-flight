import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {faqs} from "./faqs_data.js";

const FAQs = ( ) => {
    return (
        <div className=" sm:px-8 lg:px-12">
            {!!faqs && faqs.length > 0 && (
                faqs?.map((faq, index) => (
                    <Accordion key={index} >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            style={{
                                background: "#202124",
                                color: "white",
                                padding: '8px 12px',
                            }}
                        >
                            <Typography component="span" className="text-sm sm:text-base">
                                {faq?.question}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            style={{
                                backgroundColor: "#202124",
                                color: "white",
                                textAlign: "left",
                                padding: '12px',
                            }}
                            className="text-sm sm:text-base"
                        >
                            {faq?.answer}
                        </AccordionDetails>
                    </Accordion>
                ))
            )}
        </div>
    );
};

export default FAQs;
