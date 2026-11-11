
    // Replace curly single quotes and apostrophes with straight single quote
    //      /[\u2018\u2019\u201a\u201b\u2032\u2035]/g  =>  "'"
    // Replace curly double quotes with straight double quote
    //      /[\u201c\u201d\u201e\u201f\u2033\u2034\u2036\u2037]/g  =>  '"'
    // Optionally replace em-dashes and en-dashes with hyphens
    //      /[\u2013\u2014]/g  =>  '-'
    $(document).ready(function (e) {
        var element = document.getElementById("NPI");
        if (element) {
            element.addEventListener("blur", function (e) {
                var inputTarget = e.target;
                var inputValue = inputTarget.value;

                if (inputValue != null) {
                    inputValue = inputValue.replaceAll(/[\u2018\u2019\u201a\u201b\u2032\u2035]/g, "'");
                    inputValue = inputValue.replaceAll(/[\u201c\u201d\u201e\u201f\u2033\u2034\u2036\u2037]/g, '"');
                    inputValue = inputValue.replaceAll(/[\u2013\u2014]/g, '-');
                    if (inputValue !== inputTarget.value) {
                        inputTarget.value = inputValue;
                    }
                }
            }, true);
        }
    });
