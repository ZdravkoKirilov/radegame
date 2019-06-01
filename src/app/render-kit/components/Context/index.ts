import { ContextProvider } from "./Provider";
import { ContextConsumer } from "./Consumer";

export const createContext = <T = {}>() => {
    const provider = class extends ContextProvider<T> { };
    const consumer = class extends ContextConsumer<T> { };
    consumer.prototype.key = provider;

    return {
        Provider: provider,
        Consumer: consumer
    };
};