export class GenericHelper {
    static getDate(currentDate) {
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    static formatDuration(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours} hr ${mins} min`;
    }

    static getStops = (stopPrice) => {
        if (stopPrice?.direct?.isPresent) return 0;
        if (stopPrice?.one?.isPresent) return 1;
        if (stopPrice?.twoOrMore?.isPresent) return 2;
        return 0;
    };


    static getPopularFlights() {
        return [
            {
                name: "Lahore", destinations: ["Dubai", "Paris", "New York", "Jeddah"],
            },
            {
                name: "Islamabad", destinations: ["Los Angeles", "Sydney", "New York", "Jeddah"],
            },
            {
                name: "Faisalabad", destinations: ["Dubai", "Sydney", "New York", "Paris"],
            },
            {
                name: "Sialkot", destinations: ["Dubai", "Sydney", "Jeddah", "New York"],
            }
        ];
    }

    static getOriginCities () {
        return ["Lahore", "Islamabad", "Faisalabad", "Salkot"];
    }
}

