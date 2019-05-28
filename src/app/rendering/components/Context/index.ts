import { ContextProvider } from "./Provider";
import { ContextConsumer } from "./Consumer";

export const createContext = () => {
    const provider = class extends ContextProvider { };
    const consumer = class extends ContextConsumer { };
    consumer.prototype.key = provider;

    return {
        Provider: provider,
        Consumer: consumer
    };
};