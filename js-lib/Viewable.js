'use strict';


class Viewable
{

    static Validate(object)
    {
        if (typeof object !== '[object Object]')
            return false;
        if (!('viewable' in object))
            return false;
        if (!(object.viewable instanceof Viewable))
            return false;

        return true;
    }

}
