import React from "react";

const Impressum = () => {
    return (
        <div className="mx-auto w-[calc(100%-1.5rem)] max-w-[1232px] pb-10 pt-5 sm:w-[calc(100%-2rem)] sm:pb-[60px] sm:pt-[30px]">
            <article className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-5 text-slate-900 shadow-lg dark:border-background-600 dark:bg-background-900 dark:text-text md:p-8">
                <header className="mb-8 border-b border-primary-200 pb-6 dark:border-primary-800">
                    <h1 className="m-0 font-heading text-4xl text-slate-900 dark:text-text md:text-5xl">Impressum</h1>
                </header>

                <section>
                    <h2 className="m-0 font-heading text-2xl text-slate-900 dark:text-text">Anbieter</h2>
                    <address className="mt-4 not-italic font-body leading-7 text-slate-700 dark:text-text-100">
                        Maximilian Handke
                        <br/>
                        Haydnallee 43
                        <br/>
                        14612 Falkensee
                    </address>
                </section>

                <section className="mt-8 border-t border-primary-200 pt-6 dark:border-primary-800">
                    <h2 className="m-0 font-heading text-2xl text-slate-900 dark:text-text">Kontakt</h2>
                    <p className="mt-4 font-body leading-7 text-slate-700 dark:text-text-100">
                        E-Mail:{" "}
                        <a
                            href="mailto:max.handke99@gmail.com"
                            className="text-primary-700 underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:text-primary-300 dark:focus-visible:outline-primary-300"
                        >
                            max.handke99@gmail.com
                        </a>
                    </p>
                </section>

            </article>
        </div>
    );
};

export default Impressum;
