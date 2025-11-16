import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import ContactForm from './ContactForm';

function ContactOverlay({ contactOverlay, handleCloseContactOverlay }) {


  // Define the function here
  const handleSubmit = async (formData) => {
    try {
      const res = await fetch("https://xrol.me/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        alert("Message sent successfully!");
        handleCloseContactOverlay();
      } else {
        alert("Failed to send message: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send message: " + err.message);
    }
  };

  return (
    <AnimatePresence>
      {contactOverlay && (
        <>
          {/* Background overlay */}
          <motion.div
            className="fixed inset-0 bg-black/95 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleCloseContactOverlay}
          />



          {/* Contact form container */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <div
              className="pointer-events-auto w-[85vw] sm:w-5/6 md:w-4/6 lg:w-2/3 xl:w-3/7"
              onClick={(e) => e.stopPropagation()}
            >
              <ContactForm
                onSubmit={handleSubmit}
                onCancel={handleCloseContactOverlay}
              />

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ContactOverlay;
