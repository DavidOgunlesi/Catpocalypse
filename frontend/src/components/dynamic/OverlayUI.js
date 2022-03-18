/**
 * Overay UI component handles overlaying UI on the main map screen. I can be passed
 * child components which get rendered at a given x and y.
 */

/**
 * The imports which are required for this page to run which includes packages from React.
 */
import { Box, Grid, Typography } from "@material-ui/core";
import React,{useState} from "react";
import { makeStyles } from "@material-ui/core";

  /**
   * Styling for UI
   */
  const style = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    //pointerEvents: 'none',
    background: 'transparent',
    textAlign: 'center',
    zIndex: 100000
  };

  const useDefStyles = makeStyles((theme) => ({
    small: {
      '& svg': {
        fontSize: 25
      }
    },
    medium: {
      '& svg': {
        fontSize: 50
      }
    },
    large: {
      '& svg': {
        fontSize: 75
      }
    },
    huge: {
      '& svg': {
        fontSize: 100
      }
    }
  }));

/**
 * 
 */
export default function OverayUI({
    children
}){
    const defClasses = useDefStyles();

    const childrenWithProps = React.Children.map(children, child => {
        // Checking isValidElement is the safe way and avoids a typescript
        // error too.
        if (React.isValidElement(child)) {
            console.log(child.props)
            var childrenStyle = {
                position: 'relative',
                float: child.props.float,
                top: child.props.y,
                left: child.props.x,
            }
            // Make custom style class to resize icon if applicable
            var useStyles = makeStyles((_) => ({
                size: {
                    '& svg': {
                    fontSize: child.props.overrideSize
                    }
                }
            }));
            var classes = useStyles();
            var sizeClass = classes.size
            switch (child.props.size) {
                case "small":
                    sizeClass = defClasses.small
                    break;
                case "medium":
                    sizeClass = defClasses.medium
                    break;
                case "large":
                    sizeClass = defClasses.large
                    break;
                case "huge":
                    sizeClass = defClasses.huge
                    break;
                default:
                    break;
            }
            return React.cloneElement(child, { className: sizeClass, style: childrenStyle });
        }
        return child;
      });

    return (
        <Box sx={style}>
            {childrenWithProps}
        </Box>
      );
    
}