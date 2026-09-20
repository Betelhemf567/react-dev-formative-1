import { useEffect, type ComponentType } from "react";

/**
 * withLogger
 * A simple Higher-Order Component that wraps a given component and logs
 * a message to the console whenever it mounts and unmounts. Useful during
 * development for tracing the component lifecycle without adding
 * console.log calls directly inside every component.
 */
function withLogger<P extends object>(WrappedComponent: ComponentType<P>) {
  const componentName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  const ComponentWithLogger = (props: P) => {
    useEffect(() => {
      console.log(`[withLogger] ${componentName} mounted`);
      return () => {
        console.log(`[withLogger] ${componentName} unmounted`);
      };
    }, []);

    return <WrappedComponent {...props} />;
  };

  ComponentWithLogger.displayName = `withLogger(${componentName})`;

  return ComponentWithLogger;
}

export default withLogger;