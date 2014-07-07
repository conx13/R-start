

function isikukood(kood) {
    
    var multiplier_1 = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 1);
    var multiplier_2 = new Array(3, 4, 5, 6, 7, 8, 9, 1, 2, 3);
            
    var control = kood.charAt(10);
    var retval  = false;
    
    var mod   = 0;
    var total = 0;
    
    /* Do first run. */
    for (i=0; i < 10; i++) {
        total += kood.charAt(i) * multiplier_1[i];
    }
    mod = total % 11;

    /* If modulus is ten we need second run. */
    total = 0;
    if (10 == mod) { 
        for (i=0; i < 10; i++) {
            total += kood.charAt(i) * multiplier_2[i];
        }
        mod = total % 11;
        
        /* If modulus is still ten revert to 0. */
        if (10 == mod) {
            mod = 0;
        }
    }
    
    return control == mod;
}

