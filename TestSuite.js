let currentlyRunningTest = '';

const testResultContainer = document.querySelector('.testrunResults');

function createName() {
    const name = document.createElement('div');
    name.innerHTML = currentlyRunningTest;
    name.style.marginLeft = '10px'
    name.style.marginRight = '10px'
    return name;
}

function createContainer() {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'flex-row';
    return container;
}

function fail(expected, got) {
    const container = createContainer();
    const name = createName();
    container.appendChild(name);
    const failure = document.createElement('div');
    failure.style.color = 'red';
    failure.style.fontWeight = '700';
    failure.innerHTML = `Failure: Expected ${expected}, got ${got}`;
    container.appendChild(failure);
    testResultContainer.appendChild(container);
}

function success() {
    const container = createContainer();
    const name = createName();
    container.appendChild(name);
    const success = document.createElement('div');
    success.style.color = 'green';
    success.innerHTML = `Success`;
    container.appendChild(success);
    testResultContainer.appendChild(container);
}

export function runTest(name, testFn) {
    currentlyRunningTest = name;

    testFn();

    currentlyRunningTest = '';
}

export function assertEquals(valueA, valueB) {
    if(valueA !== valueB) {
        fail(valueA, valueB)
    } else {
        success();
    }
}

export function assertArrayEquals(array1, array2) {
    if(array1.length !== array2.length) {
        fail(array1.join(','), array2.join(','))
    } else {
        if(!array1.every((value) => array2.includes(value))) {
            fail(array1.join(','), array2.join(','))
        } else {
            success();
        }
    }
}