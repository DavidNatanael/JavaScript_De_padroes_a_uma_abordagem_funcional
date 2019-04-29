import {log, timeoutPromise, retry} from "./utils/promise-helpers.js";
import './utils/array-helpers.js';
import {notasService as service} from "./nota/service.js";
import {takeUntil, debounceTime, partialize, pipe} from "./utils/operators.js";
import {eventEmitter} from "./utils/event-emitter.js";
import {Maybe} from "./utils/maybe.js";


const operations = pipe(
    partialize(takeUntil, 3),
    partialize(debounceTime, 500)
);


const action = operations (() =>
        retry(3, 3000, () => timeoutPromise(200, service
            .sumItems('2143')))
            .then(total => eventEmitter.emit('itensTotalizados', total))
            .catch(console.log)
    );

document
    .querySelector('#myButton')
    .onclick = action;
