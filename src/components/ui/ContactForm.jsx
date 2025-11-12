// ContactForm.jsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

function ContactForm({ onSubmit, onCancel }) {
    function handleSubmit(e) {
        e.preventDefault();
        const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            message: e.target.message.value,
        };
        if (onSubmit) onSubmit(formData);
    }

    return (
        <Card className="bg-background backdrop-blur-md border border-border shadow-2xl w-full max-h-[90vh] flex flex-col">
            <CardHeader>
                <CardTitle className="text-center text-3xl font-semibold py-2">Contact Me</CardTitle>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto">
                <form onSubmit={handleSubmit} className="space-y-6 ">

                    <div className="flex flex-col space-y-3 ">
                        <Label className="text-lg" htmlFor="name">Name</Label>
                        <Input id="name" name="name" type="text" placeholder="Your name" required />
                    </div>

                    <div className="flex flex-col space-y-3">
                        <Label className="text-lg" htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="maxmusterman@example.com" required />
                    </div>

                    <div className="flex flex-col space-y-3">
                        <Label className="text-lg" htmlFor="message">Message</Label>
                        <Textarea
                            id="message"
                            name="message"
                            placeholder="Tell me about your idea..."
                            className="min-h-[20vh] md:min-h-[30vh] lg:min-h-[40vh] resize-y"
                            required
                        />
                    </div>

                    {/* Buttons inside the form so browser validation runs */}
                    <div className="flex justify-end gap-2 mt-4 pt-4">
                        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
                        <Button type="submit">Send Message</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

export default ContactForm;
