const nodemailer = require('nodemailer');

exports.submitContactForm = async (req, res) => {
    const { email, message } = req.body;

    if (!email || !message) {
        return res.status(400).json({ error: "Email and message are required." });
    }

    // Connect to Gmail
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Setup the email you will receive
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Sends it to yourself
        replyTo: email,             // This lets you click "Reply" and email the user back securely
        subject: `🌐 Portfolio Message from: ${email}`,
        text: `You have a new message from a portfolio visitor.\n\nFrom: ${email}\n\nMessage:\n${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ 
            success: true, 
            message: "Thank you for reaching out! Your message has been sent successfully." 
        });
    } catch (error) {
        console.error("Email sending error: ", error);
        return res.status(500).json({ error: "Unable to send message right now. Please reach out directly to yashendrisenevirathna@gmail.com." });
    }
};
