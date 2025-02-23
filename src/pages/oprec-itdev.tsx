import Stepper, { Step } from "@/components/animated/stepper";
import { useForm, FormProvider } from "react-hook-form";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/init";
import { useState } from "react";
import { toast } from "react-toastify";
import ShinyText from "@/components/Words/ShinnyText";
import router from "next/router"
type FormValues = {
    Name: string;
    Github_Email: string;
    Default_Email: string;
    Role: string;
};

function OprecITDEV() {
    const methods = useForm<FormValues>({
        defaultValues: {
            Name: "",
            Github_Email: "",
            Default_Email: "",
            Role: "",
        },
        mode: "onTouched",
    });

    const [currentStep, setCurrentStep] = useState(1);
    const { formState: { errors, isValid, isSubmitting } } = methods;
    const onSubmit = async (data: FormValues) => {
        try {
            await addDoc(collection(db, "registrations"), data);
            toast.success("Form submitted successfully!");
            methods.reset();
            router.push("/")
        } catch {
            toast.error("Failed to submit form. Please try again later.");
        }
    };
    const validateStep = async (step: number) => {
        switch (step) {
            case 2:
                return await methods.trigger("Name");
            case 3:
                return await methods.trigger(["Github_Email", "Default_Email", "Role"]);
            default:
                return true;
        }
    };
    return (
        <div className="h-full w-full min-h-screen bg-zinc-900 text-white">
            <header className="p-4">
                <ShinyText text="OPREC ITDEV ECS 2025/2026" disabled={false} speed={3} className='custom-class font-bold text-2xl' />
            </header>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Stepper
                        initialStep={1}
                        onStepChange={async (step) => {
                            const isValid = await validateStep(step - 1);
                            if (isValid) setCurrentStep(step);
                        }}
                        onFinalStepCompleted={

                            methods.handleSubmit(onSubmit)
                        }
                        backButtonText="Previous"
                        nextButtonText={currentStep === 3 ? "Submit" : "Next"}
                        backButtonProps={{ disabled: currentStep === 1 }}
                        nextButtonProps={{
                            disabled: isSubmitting ||
                                (currentStep === 2 && !methods.getFieldState("Name").isDirty) ||
                                (currentStep === 3 && !isValid)
                        }}
                    >
                        <Step>
                            <div className="p-4">
                                <h2 className="text-xl font-semibold">
                                    Welcome to ITDEV Registration!
                                </h2>
                                <p>
                                    Get ready to join the team by filling out your information.
                                </p>
                            </div>
                        </Step>
                        <Step>
                            <div className="p-4">
                                <h2 className="text-xl font-semibold">Step 2: Your Name</h2>
                                <input
                                    {...methods.register("Name", {
                                        required: "Name is required",
                                        minLength: {
                                            value: 3,
                                            message: "Name must be at least 3 characters"
                                        }
                                    })}
                                    placeholder="Masukkan Nama Anda"
                                    className="p-2 rounded bg-gray-800 text-white w-full mt-2"
                                />
                                {errors.Name && (
                                    <p className="text-red-500 mt-1">
                                        {errors.Name.message}
                                    </p>
                                )}
                            </div>
                        </Step>
                        <Step>
                            <div className="p-4">
                                <h2 className="text-xl font-semibold">
                                    Step 3: Contact Information
                                </h2>
                                <input
                                    {...methods.register("Github_Email", {
                                        required: "Github Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Invalid email format"
                                        }
                                    })}
                                    placeholder="Masukkan Email Github Anda"
                                    className="p-2 rounded bg-gray-800 text-white w-full mt-2 mb-4"
                                />
                                {errors.Github_Email && (
                                    <p className="text-red-500 mt-1">
                                        {errors.Github_Email.message}
                                    </p>
                                )}
                                <input
                                    {...methods.register("Default_Email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Invalid email format"
                                        }
                                    })}
                                    placeholder="Masukkan Email Anda"
                                    className="p-2 rounded bg-gray-800 text-white w-full mt-2 mb-4"
                                />
                                {errors.Default_Email && (
                                    <p className="text-red-500 mt-1">
                                        {errors.Default_Email.message}
                                    </p>
                                )}
                                <select
                                    {...methods.register("Role", {
                                        required: "Role is required",
                                    })}
                                    className="p-2 rounded bg-gray-800 text-white w-full"
                                >
                                    <option value="">Pilih Role Anda</option>
                                    <option value="Frontend">Frontend</option>
                                    <option value="Backend">Backend</option>
                                    <option value="UI/UX">UI/UX</option> {/* Fixed option value */}
                                </select>
                                {errors.Role && (
                                    <p className="text-red-500 mt-1">
                                        {errors.Role.message}
                                    </p>
                                )}
                            </div>
                        </Step>
                    </Stepper>
                </form>
            </FormProvider>
        </div>
    );
}

export default OprecITDEV;