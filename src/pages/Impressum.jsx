import React from "react";

const Impressum = () => {
    return (
        <main className="container px-4 pb-12 pt-6" id="main-content">
            <article className="mx-auto max-w-3xl rounded-xl bg-background-900 p-5 text-text md:p-8">
                <header className="mb-8 border-b border-primary-700 pb-6">
                    <h1 className="font-heading text-4xl text-text md:text-5xl">Impressum</h1>
                </header>

                <section>
                    <h2 className="font-heading text-2xl text-text">Anbieter</h2>
                    <address className="mt-4 not-italic font-body leading-7 text-text-100">
                        Maximilian Handke
                        <br/>
                        Haydnallee 43
                        <br/>
                        14612 Falkensee
                    </address>
                </section>

                <section className="mt-8 border-t border-primary-800 pt-6">
                    <h2 className="font-heading text-2xl text-text">Kontakt</h2>
                    <p className="mt-4 font-body leading-7 text-text-100">
                        E-Mail:{" "}
                        <a
                            href="mailto:max.handke99@gmail.com"
                            className="text-primary-300 underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300"
                        >
                            max.handke99@gmail.com
                        </a>
                    </p>
                </section>

            </article>
        </main>
    );
};

export default Impressum;
